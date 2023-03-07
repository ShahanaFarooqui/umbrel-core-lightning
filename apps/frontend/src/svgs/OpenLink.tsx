import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';

export const OpenLinkSVG = props => {
  return (
    <OverlayTrigger
      placement='auto'
      delay={{ show: 250, hide: 250 }}
      overlay={<Tooltip>{'Open with Blockstream Explorer'}</Tooltip>}
      >
      <svg id={props.id} className={props.className} width='17' height='17' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M10.875 0.75C10.875 0.335786 11.2108 1.11759e-08 11.625 1.11759e-08H17.25C17.6642 1.11759e-08 18 0.335786 18 0.75V6.375C18 6.78921 17.6642 7.125 17.25 7.125C16.8358 7.125 16.5 6.78921 16.5 6.375V1.5H11.625C11.2108 1.5 10.875 1.16421 10.875 0.75Z' className='fill-light' />
        <path d='M17.7803 0.21967C18.0732 0.512563 18.0732 0.987437 17.7803 1.28033L11.0303 8.03033C10.7374 8.32322 10.2626 8.32322 9.96967 8.03033C9.67678 7.73744 9.67678 7.26256 9.96967 6.96967L16.7197 0.21967C17.0126 -0.0732233 17.4874 -0.0732233 17.7803 0.21967Z' className='fill-light' />
        <path d='M0.43934 3.43934C0.720644 3.15804 1.10217 3 1.5 3H7.5C7.91421 3 8.25 3.33579 8.25 3.75C8.25 4.16421 7.91421 4.5 7.5 4.5L1.5 4.5L1.5 16.5H13.5V10.5C13.5 10.0858 13.8358 9.75 14.25 9.75C14.6642 9.75 15 10.0858 15 10.5V16.5C15 16.8978 14.842 17.2794 14.5607 17.5607C14.2794 17.842 13.8978 18 13.5 18H1.5C1.10218 18 0.720645 17.842 0.43934 17.5607C0.158035 17.2794 0 16.8978 0 16.5V4.5C0 4.10217 0.158036 3.72064 0.43934 3.43934Z' className='fill-light' />
      </svg>
    </OverlayTrigger>
  );
};
