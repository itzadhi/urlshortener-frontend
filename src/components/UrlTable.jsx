import React from 'react';
import { Table } from 'react-bootstrap';
import { MdOutlineContentCopy } from 'react-icons/md';
import { toast } from 'react-toastify';
import CopyToClipboard from 'react-copy-to-clipboard';

const UrlTable = ({ userUrls }) => {
  return (
    <Table className='table-striped-columns'>
      <thead className='fs-5 custom-table'>
        <tr>
          <th className='px-4 py-3 custom-table' scope='col'>
            No
          </th>
          <th className='px-4 py-3 custom-table' scope='col'>
            Shorten Url
          </th>
          <th className='px-4 py-3 custom-table' scope='col'>
            Original Url
          </th>
          <th className='px-4 py-3 custom-table' scope='col'>
            Date
          </th>
        </tr>
      </thead>
      <tbody className='fs-6'>
        {userUrls?.map((item, index) => {
          return (
            <tr key={item?._id}>
              <th className='p-4'>{index + 1}</th>
              <td className='p-4' style={{ position: 'relative' }}>
                <span className='d-inline-flex '>{item?.shortenUrl} </span>
                <span
                  style={{
                    position: 'absolute',
                    right: '0.6rem',
                  }}
                >
                  <CopyToClipboard
                    text={item?.shortenUrl}
                    onCopy={() => {
                      toast.info('Copied', {
                        position: 'top-right',
                      });
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <MdOutlineContentCopy className='fs-5' />
                  </CopyToClipboard>
                </span>
              </td>
              <td className='p-4 custom-table-td'>{item?.originalUrl}</td>
              <td className='p-4'>{item?.createdAt}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default UrlTable;
