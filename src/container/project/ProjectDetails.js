import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import UilEditAlt from '@iconscout/react-unicons/icons/uil-edit-alt';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import UilListUl from '@iconscout/react-unicons/icons/uil-list-ul';
import UilChartPie from '@iconscout/react-unicons/icons/uil-chart-pie';
import UilWebGridAlt from '@iconscout/react-unicons/icons/uil-web-grid-alt';
import UilClock from '@iconscout/react-unicons/icons/uil-clock';
import { Link, useParams } from 'react-router-dom';
import FileListCard from './overview/FileListCard';
import Heading from '../../components/heading/heading';
import { filterSinglePage } from '../../redux/project/actionCreator';

function ProjectDetails() {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.data);
  const params = useParams();
  useEffect(() => {
    if (!dispatch) {
      dispatch(filterSinglePage(parseInt(params.id, 10)));
    }
  }, [params.id, dispatch]);

  const { title, description } = project[0];
  return (
    <>
      <div className="flex items-center justify-between pt-[42px] pb-[35px] px-[25px] flex-wrap gap-[15px] sm:justify-center">
        <div className="inline-flex flex-wrap items-center gap-5 md:justify-center">
          <Heading as="h4" className="text-dark dark:text-white87 text-[20px] font-semibold mb-0">
            {title}
          </Heading>
        </div>
        <div className="inline-flex items-center gap-x-5">
          <Link
            to="#"
            className="flex items-center gap-x-1.5 bg-white dark:bg-white10 text-primary h-[35px] px-[14px] text-xs font-medium border border-normal dark:border-white10 rounded-md"
          >
            <UilEditAlt className="w-[14px] h-[14px]" />
            Edit
          </Link>
          <Link
            to="#"
            className="flex items-center gap-x-1.5 bg-white dark:bg-white10 dark:hover:bg-white30 text-danger h-[35px] px-[14px] text-xs font-medium border border-normal dark:border-white10 rounded-md transition duration-300"
          >
            <UilTrashAlt className="w-[14px] h-[14px]" />
            Remove
          </Link>
        </div>
      </div>
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-[30px] ssm:px-[15px]  pb-[20px]">
        <Row gutter={25}>
          <Col xxl={6} xl={8} xs={24}>
            <div className="bg-white dark:bg-white10 mb-[25px] p-[25px] rounded-[10px] gap-[25px] flex flex-wrap min-xl:flex-col xl:justify-between">
              <div className="flex items-center gap-x-5">
                <Link
                  to="#"
                  className="flex items-center justify-center bg-warning text-primary w-[60px] h-[60px] rounded-xl"
                >
                  <UilListUl className="w-[25px] h-[25px]" />
                </Link>
                <div>
                  <Heading as="h5" className="text-dark dark:text-white87 text-[20px] font-semibold mb-[3px]">
                    47
                  </Heading>
                  <p className="mb-0 text-body dark:text-white60">Total Site Set</p>
                </div>
              </div>
              <div className="flex items-center gap-x-5">
                <Link
                  to="#"
                  className="flex items-center justify-center bg-warning text-primary w-[60px] h-[60px] rounded-xl"
                >
                  <UilChartPie className="w-[25px] h-[25px]" />
                </Link>
                <div>
                  <Heading as="h5" className="text-dark dark:text-white87 text-[20px] font-semibold mb-[3px]">
                    34
                  </Heading>
                  <p className="mb-0 text-body dark:text-white60">Total Devices</p>
                </div>
              </div>
              <div className="flex items-center gap-x-5">
                <Link
                  to="#"
                  className="flex items-center justify-center bg-warning text-primary w-[60px] h-[60px] rounded-xl"
                >
                  <UilWebGridAlt className="w-[25px] h-[25px]" />
                </Link>
                <div>
                  <Heading as="h5" className="text-dark dark:text-white87 text-[20px] font-semibold mb-[3px]">
                    500
                  </Heading>
                  <p className="mb-0 text-body dark:text-white60">Total Sampling Point Set</p>
                </div>
              </div>
              <div className="flex items-center gap-x-5">
                <Link
                  to="#"
                  className="flex items-center justify-center bg-warning text-primary w-[60px] h-[60px] rounded-xl"
                >
                  <UilClock className="w-[25px] h-[25px]" />
                </Link>
                <div>
                  <Heading as="h5" className="text-dark dark:text-white87 text-[20px] font-semibold mb-[3px]">
                    250
                  </Heading>
                  <p className="mb-0 text-body dark:text-white60">Active Devcies on Project</p>
                </div>
              </div>
            </div>
          </Col>
          <Col xxl={12} xl={16} xs={24}>
            <div className="bg-white dark:bg-white10 min-4xl:min-h-[485px] mb-[25px] rounded-[10px]">
              <div className="px-[25px] py-[18px] border-b border-regular dark:border-white10">
                <Heading as="h3" className="m-0 text-lg font-semibold text-dark dark:text-white87">
                  About Project
                </Heading>
              </div>
              <div className="p-[25px]">
                <div>
                  <p className="text-body dark:text-white60">{description}</p>
                </div>
                <div className="flex items-center mt-[42px] gap-x-20 gap-y-[15px] flex-wrap">
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Project Title</span>
                    <p className="font-medium text-body dark:text-white60">{title}</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Sequence Interval</span>
                    <p className="font-medium text-body dark:text-white60">10</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">projectHash</span>
                    <p className="font-medium text-primary">210ca93c00f78b5f0544f8fd3cd51f65</p>
                  </div>
                  {/* <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Deadline</span>
                    <p className="font-medium text-danger">18 Mar 2020</p>
                  </div> */}
                </div>
              </div>
            </div>
          </Col>
          <Col xxl={8} xs={24}>
            <FileListCard />
          </Col>
        </Row>
      </main>
    </>
  );
}

export default ProjectDetails;
