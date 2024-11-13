import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);

    // Clear localStorage before each test to ensure no data persists between tests.
    localStorage.clear();
  });

  afterEach(() => {
    // Clear localStorage after each test.
    localStorage.clear();
  });

  describe('getItem', () => {
    it('should return parsed object when valid JSON string is stored', () => {
      const mockData = { name: 'Test User', age: 30 };
      localStorage.setItem('user', JSON.stringify(mockData));

      const result = service.getItem<{ name: string; age: number }>('user');
      expect(result).toEqual(mockData);
    });

    it('should return null if no data is found for the key', () => {
      const result = service.getItem('nonexistentKey');
      expect(result).toBeNull();
    });

    it('should return null if stored data is not valid JSON', () => {
      localStorage.setItem('invalidJSON', 'not a json string');
      const result = service.getItem('invalidJSON');
      expect(result).toBeNull();
    });
  });

  describe('setItem', () => {
    it('should store stringified object in localStorage', () => {
      const mockData = { name: 'Test User', age: 30 };
      service.setItem('user', mockData);

      const storedData = localStorage.getItem('user');
      expect(storedData).toBe(JSON.stringify(mockData));
    });

    it('should overwrite existing data with the same key', () => {
      const initialData = { name: 'Initial User' };
      const newData = { name: 'Updated User' };

      service.setItem('user', initialData);
      service.setItem('user', newData);

      const result = localStorage.getItem('user');
      expect(result).toBe(JSON.stringify(newData));
    });

    it('should handle different data types (number, string, boolean, object, array)', () => {
      service.setItem('number', 123);
      service.setItem('string', 'test');
      service.setItem('boolean', true);
      service.setItem('object', { key: 'value' });
      service.setItem('array', [1, 2, 3]);

      expect(localStorage.getItem('number')).toBe('123');
      expect(localStorage.getItem('string')).toBe('"test"');
      expect(localStorage.getItem('boolean')).toBe('true');
      expect(localStorage.getItem('object')).toBe(JSON.stringify({ key: 'value' }));
      expect(localStorage.getItem('array')).toBe(JSON.stringify([1, 2, 3]));
    });
  });
});
