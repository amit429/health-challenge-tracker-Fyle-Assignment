import 'jest-preset-angular/setup-jest';

let consoleSpy: jest.SpyInstance;
beforeAll(() => {
    consoleSpy = jest.spyOn(global.console, 'error').mockImplementation((message) => {
        if (!message?.message?.includes('Could not parse CSS stylesheet')) {
            global.console.warn(message);
        }
    })
});

afterAll(() => consoleSpy.mockRestore());

Object.defineProperty(window, 'HTMLCanvasElement', {
    value: class {
      getContext() {
        return {
          fillRect: () => {},
          clearRect: () => {},
          getImageData: (x: number, y: number, w: number, h: number) => ({
            data: new Array(w * h * 4)
          }),
          putImageData: () => {},
          createImageData: () => ([]),
          setTransform: () => {},
          drawImage: () => {},
          save: () => {},
          fillText: () => {},
          restore: () => {},
          beginPath: () => {},
          moveTo: () => {},
          lineTo: () => {},
          closePath: () => {},
          stroke: () => {},
          translate: () => {},
          scale: () => {},
          rotate: () => {},
          arc: () => {},
          fill: () => {},
          measureText: () => ({ width: 0 }),
          transform: () => {},
          rect: () => {},
          clip: () => {},
        };
      }
    }
  });
  
  // Mock ResizeObserver
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };