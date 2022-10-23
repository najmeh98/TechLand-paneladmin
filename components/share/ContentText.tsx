import styled from "styled-components";

interface OwenProp {
  onClick?: () => void;
  children: string;
  className?: string;
}

export const ContentText: React.FC<OwenProp> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <Text
      onClick={onClick}
      className={className}
      dangerouslySetInnerHTML={{ __html: children }}
    >
      {/* {children} */}
    </Text>
  );
};

const Text = styled.p`
  margin: 0;
  cursor: pointer;
`;
