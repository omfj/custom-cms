export type TParams = {
  [key: string]: string;
};

export type LayoutProps<T extends TParams = {}> = {
  children: React.ReactNode;
  params: T;
};
