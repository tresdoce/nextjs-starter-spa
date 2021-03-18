export interface Loading {
  show: boolean;
}

export interface WrapperContentProps {
  setLoading: Function;
  active: boolean;
  loading: Loading;
  id: string;
  children: any;
  errorFromPermissions: boolean;
}
