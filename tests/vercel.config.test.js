import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const vercelConfigPath = join(__dirname, '..', 'vercel.json');

describe('vercel.json configuration', () => {
  let config;

  beforeAll(() => {
    // Read and parse the vercel.json file
    const configContent = readFileSync(vercelConfigPath, 'utf-8');
    config = JSON.parse(configContent);
  });

  describe('file structure', () => {
    it('should exist', () => {
      expect(existsSync(vercelConfigPath)).toBe(true);
    });

    it('should be valid JSON', () => {
      expect(() => {
        const content = readFileSync(vercelConfigPath, 'utf-8');
        JSON.parse(content);
      }).not.toThrow();
    });

    it('should have all required top-level properties', () => {
      expect(config).toHaveProperty('version');
      expect(config).toHaveProperty('builds');
      expect(config).toHaveProperty('routes');
    });
  });

  describe('version configuration', () => {
    it('should use version 2', () => {
      expect(config.version).toBe(2);
    });

    it('should have version as a number', () => {
      expect(typeof config.version).toBe('number');
    });
  });

  describe('builds configuration', () => {
    it('should have builds array', () => {
      expect(Array.isArray(config.builds)).toBe(true);
    });

    it('should have at least one build configuration', () => {
      expect(config.builds.length).toBeGreaterThan(0);
    });

    it('should configure index.js with @vercel/node', () => {
      const indexBuild = config.builds.find(build => build.src === 'index.js');
      expect(indexBuild).toBeDefined();
      expect(indexBuild.use).toBe('@vercel/node');
    });

    it('should have valid build structure', () => {
      config.builds.forEach(build => {
        expect(build).toHaveProperty('src');
        expect(build).toHaveProperty('use');
        expect(typeof build.src).toBe('string');
        expect(typeof build.use).toBe('string');
      });
    });
  });

  describe('routes configuration', () => {
    it('should have routes array', () => {
      expect(Array.isArray(config.routes)).toBe(true);
    });

    it('should have at least two routes', () => {
      expect(config.routes.length).toBeGreaterThanOrEqual(2);
    });

    it('should have valid route structure', () => {
      config.routes.forEach(route => {
        expect(route).toHaveProperty('src');
        expect(route).toHaveProperty('dest');
        expect(typeof route.src).toBe('string');
        expect(typeof route.dest).toBe('string');
      });
    });

    it('should configure send-email POST route', () => {
      const sendEmailRoute = config.routes.find(
        route => route.src === '^/routes/send-email$'
      );
      expect(sendEmailRoute).toBeDefined();
      expect(sendEmailRoute.dest).toBe('/index.js');
      expect(sendEmailRoute.methods).toEqual(['POST']);
    });

    it('should have POST method as an array for send-email route', () => {
      const sendEmailRoute = config.routes.find(
        route => route.src === '^/routes/send-email$'
      );
      expect(Array.isArray(sendEmailRoute.methods)).toBe(true);
      expect(sendEmailRoute.methods).toContain('POST');
    });

    it('should configure catch-all route', () => {
      const catchAllRoute = config.routes.find(
        route => route.src === '/(.*)'
      );
      expect(catchAllRoute).toBeDefined();
      expect(catchAllRoute.dest).toBe('/index.js');
    });

    it('should have catch-all route as the last route', () => {
      const lastRoute = config.routes[config.routes.length - 1];
      expect(lastRoute.src).toBe('/(.*)',
        'Catch-all route should be last to avoid overriding specific routes');
    });

    it('should route all requests to index.js', () => {
      config.routes.forEach(route => {
        expect(route.dest).toBe('/index.js');
      });
    });

    it('should use regex patterns for route matching', () => {
      const sendEmailRoute = config.routes.find(
        route => route.src === '^/routes/send-email$'
      );
      // Verify it starts with ^ and ends with $ for exact match
      expect(sendEmailRoute.src).toMatch(/^\^.*\$$/);
    });
  });

  describe('github configuration', () => {
    it('should have github configuration', () => {
      expect(config).toHaveProperty('github');
    });

    it('should set github.silent to true', () => {
      expect(config.github.silent).toBe(true);
    });

    it('should have silent as a boolean', () => {
      expect(typeof config.github.silent).toBe('boolean');
    });
  });

  describe('route order and priority', () => {
    it('should define specific routes before catch-all', () => {
      const catchAllIndex = config.routes.findIndex(
        route => route.src === '/(.*)'
      );
      const sendEmailIndex = config.routes.findIndex(
        route => route.src === '^/routes/send-email$'
      );

      expect(sendEmailIndex).toBeLessThan(catchAllIndex,
        'Specific routes should come before catch-all route');
    });
  });

  describe('route method constraints', () => {
    it('should only allow POST for send-email endpoint', () => {
      const sendEmailRoute = config.routes.find(
        route => route.src === '^/routes/send-email$'
      );
      expect(sendEmailRoute.methods).toHaveLength(1);
      expect(sendEmailRoute.methods[0]).toBe('POST');
    });

    it('should not define methods for catch-all route', () => {
      const catchAllRoute = config.routes.find(
        route => route.src === '/(.*)'
      );
      // Catch-all should accept all methods (no methods property or undefined)
      expect(catchAllRoute.methods).toBeUndefined();
    });
  });

  describe('security and edge cases', () => {
    it('should not have duplicate route patterns', () => {
      const routePatterns = config.routes.map(route => route.src);
      const uniquePatterns = new Set(routePatterns);
      expect(routePatterns.length).toBe(uniquePatterns.size);
    });

    it('should not have empty route sources', () => {
      config.routes.forEach(route => {
        expect(route.src.length).toBeGreaterThan(0);
      });
    });

    it('should not have empty destinations', () => {
      config.routes.forEach(route => {
        expect(route.dest.length).toBeGreaterThan(0);
      });
    });

    it('should have valid regex patterns in routes', () => {
      config.routes.forEach(route => {
        expect(() => new RegExp(route.src)).not.toThrow();
      });
    });
  });

  describe('integration with Express app', () => {
    it('should route to the correct serverless function entry point', () => {
      const indexBuild = config.builds.find(build => build.src === 'index.js');
      expect(indexBuild).toBeDefined();

      // All routes should point to the same entry point
      config.routes.forEach(route => {
        expect(route.dest).toBe('/index.js');
      });
    });

    it('should match Express route structure for send-email', () => {
      // Express app uses '/routes/send-email' as route
      const sendEmailRoute = config.routes.find(
        route => route.src === '^/routes/send-email$'
      );
      expect(sendEmailRoute).toBeDefined();

      // Verify the pattern matches the Express route path
      const pattern = new RegExp('^/routes/send-email$');
      expect(pattern.test('/routes/send-email')).toBe(true);
      expect(pattern.test('/routes/send-email/')).toBe(false);
      expect(pattern.test('/routes/send-email/extra')).toBe(false);
    });
  });

  describe('deployment configuration', () => {
    it('should use supported Vercel build runtime', () => {
      const indexBuild = config.builds.find(build => build.src === 'index.js');
      const supportedRuntimes = ['@vercel/node', '@now/node'];
      expect(supportedRuntimes).toContain(indexBuild.use);
    });

    it('should have proper configuration for serverless functions', () => {
      // Vercel v2 requires builds array
      expect(config.version).toBe(2);
      expect(config.builds).toBeDefined();
      expect(config.builds.length).toBeGreaterThan(0);
    });
  });

  describe('configuration completeness', () => {
    it('should not have unexpected top-level properties', () => {
      const allowedProperties = ['version', 'builds', 'routes', 'github', 'env', 'regions', 'functions'];
      const configKeys = Object.keys(config);

      configKeys.forEach(key => {
        expect(allowedProperties).toContain(key);
      });
    });

    it('should have minimal required configuration', () => {
      // At minimum, needs version, builds, and routes
      expect(config.version).toBeDefined();
      expect(config.builds).toBeDefined();
      expect(config.routes).toBeDefined();
    });
  });

  describe('regression tests', () => {
    it('should maintain serverless function compatibility after changes', () => {
      // This test ensures that any changes to vercel.json don't break
      // the serverless function deployment on Vercel
      expect(config.builds[0].src).toBe('index.js');
      expect(config.builds[0].use).toBe('@vercel/node');
    });

    it('should preserve route order for correct request handling', () => {
      // Ensure specific routes are evaluated before catch-all
      const routeOrder = config.routes.map(r => r.src);
      const catchAllPosition = routeOrder.indexOf('/(.*)', );

      expect(catchAllPosition).toBe(routeOrder.length - 1,
        'Catch-all must remain as last route to prevent shadowing other routes');
    });

    it('should maintain POST-only constraint for send-email endpoint', () => {
      // Security: ensure send-email only accepts POST
      const sendEmailRoute = config.routes.find(
        route => route.src === '^/routes/send-email$'
      );

      expect(sendEmailRoute.methods).toBeDefined();
      expect(sendEmailRoute.methods).toEqual(['POST']);
    });
  });

  describe('negative cases', () => {
    it('should not match incorrect paths for send-email', () => {
      const sendEmailPattern = new RegExp('^/routes/send-email$');

      // These should NOT match
      expect(sendEmailPattern.test('/send-email')).toBe(false);
      expect(sendEmailPattern.test('/routes/sendemail')).toBe(false);
      expect(sendEmailPattern.test('/routes/send-email/test')).toBe(false);
      expect(sendEmailPattern.test('/api/routes/send-email')).toBe(false);
    });

    it('should match valid paths for send-email', () => {
      const sendEmailPattern = new RegExp('^/routes/send-email$');

      // This should match
      expect(sendEmailPattern.test('/routes/send-email')).toBe(true);
    });

    it('should have catch-all route match various paths', () => {
      const catchAllPattern = new RegExp('/(.*)', );

      // These should all match
      expect(catchAllPattern.test('/')).toBe(true);
      expect(catchAllPattern.test('/about')).toBe(true);
      expect(catchAllPattern.test('/routes/health')).toBe(true);
      expect(catchAllPattern.test('/any/path/here')).toBe(true);
    });
  });
});