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

export const SaveList = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-label="Lists"
  >
    <path
      d="M4.5 6.25V21c0 .2.24.32.4.2l5.45-4.09a.25.25 0 0 1 .3 0l5.45 4.09c.16.12.4 0 .4-.2V6.25a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25z"
      stroke="currentColor"
    ></path>
    <path
      d="M8 6V3.25c0-.14.11-.25.25-.25h11.5c.14 0 .25.11.25.25V16.5"
      stroke="currentColor"
    ></path>
  </svg>
);

export const Writepost = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-label="Write"
  >
    <path
      d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
      fill="currentColor"
    ></path>
    <path
      d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
      stroke="currentColor"
    ></path>
  </svg>
);

export const ArrowIcon = ({ fill, style }: { fill: string; style: any }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill={fill}
    style={style}
    // class=""
    // style="left: calc(20px);"
  >
    <g>
      <path d="M12.538 6.478c-.14-.146-.335-.228-.538-.228s-.396.082-.538.228l-9.252 9.53c-.21.217-.27.538-.152.815.117.277.39.458.69.458h18.5c.302 0 .573-.18.69-.457.118-.277.058-.598-.152-.814l-9.248-9.532z"></path>
    </g>
  </svg>
);
