function VariantsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 21 21'
      fill='currentColor'
      height='1em'
      width='1em'
      {...props}
    >
      <g
        fill='none'
        fillRule='evenodd'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M17.5 14.5v-10a2 2 0 00-2-2h-8a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2z' />
        <path d='M5.305 4.935l-2.004.73a2 2 0 00-1.195 2.563l3.42 9.397A2 2 0 008.09 18.82l5.568-2.198M8.5 7.5h5M8.5 9.5h6M8.5 11.5h3' />
      </g>
    </svg>
  );
}

export default VariantsIcon;
