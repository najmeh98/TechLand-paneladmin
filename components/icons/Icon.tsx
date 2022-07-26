import styled from "styled-components";

export const GreenTik = (props: any) => (
  <svg
    width={20}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m18 1.5-11 11-5-5"
      stroke="#21B386"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowDown = ({ fill }: { fill: any }) => (
  <Svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill={fill}>
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
  </Svg>
);

const Svg = styled.svg`
  width: 1em;
  height: 1em;

  /* display: inline-block; */
  font-size: 1.5rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: pointer;
`;
