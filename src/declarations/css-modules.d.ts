declare module '*.css' {
  interface IClassNames {
      [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    __REDUX_DEVTOOLS_EXTENSION__: any;
    // __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
