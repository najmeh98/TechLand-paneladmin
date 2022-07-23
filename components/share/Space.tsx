type OwnProp = {
  horizontal?: string | number;
  vertical?: string | number;
};

export const Space = ({ horizontal, vertical }: OwnProp) => {
  return <div style={{ width: horizontal, height: vertical }} />;
};
