export interface LinkButtonProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'type' | 'onClick'
  > {}
