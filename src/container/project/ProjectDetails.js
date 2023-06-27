import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import UilEditAlt from '@iconscout/react-unicons/icons/uil-edit-alt';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import UilListUl from '@iconscout/react-unicons/icons/uil-list-ul';
import UilChartPie from '@iconscout/react-unicons/icons/uil-chart-pie';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import CreateProject from './overview/CreateProject';
import Heading from '../../components/heading/heading';
import { filterSinglePage, fetchAllProject } from '../../redux/project/actionCreator';
import { alertModal } from '../../components/modals/antd-modals';

import { DELETE_PROJECT_MUTATION } from '../../redux/mutation';

function ProjectDetails() {
  const dispatch = useDispatch();
  const history = useNavigate();
  // const project = useSelector((state) => state.project.data);
  const allProjects = useSelector((state) => state.projects.data);
  useEffect(() => {
    dispatch(fetchAllProject());
  }, [dispatch]);
  const params = useParams();
  useEffect(() => {
    if (dispatch) {
      dispatch(filterSinglePage(parseInt(params.id, 10)));
    }
  }, [params.id, dispatch]);

  const [state, setState] = useState({
    visible: false,
  });

  const [deleteProject] = useMutation(DELETE_PROJECT_MUTATION);

  const handleDelete = async () => {
    const { id } = params;
    try {
      const { data } = await deleteProject({
        variables: { id },
      });
      if (data?.deleteProject?.errors === null) {
        // Handle successful deletion
        history('/dashboard/project/view/list');
      } else {
        // Handle deletion failure
      }
    } catch (error) {
      console.log({ error });
      // Handle error during deletion
    }
  };
  const { visible } = state;

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  const showConfirm = () => {
    alertModal.confirm({
      title: 'Do you want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        handleDelete();
      },
      onCancel() {},
    });
  };

  const handleCreateProject = async () => {
    try {
      // showDeleteModal(id);
      dispatch(fetchAllProject());
    } catch (errors) {
      onCancel();
    }
  };

  const singleproject = allProjects.items.find((proj) => proj.id === params.id);
  const {
    title,
    description,
    sequenceInterval,
    projectHash,
    projectConfiguration,
    shortname,
    temporality,
    duration,
    countries,
    contacts,
  } = singleproject;
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
            to=""
            onClick={showModal}
            className="flex items-center gap-x-1.5 bg-white dark:bg-white10 text-primary h-[35px] px-[14px] text-xs font-medium border border-normal dark:border-white10 rounded-md"
          >
            <UilEditAlt className="w-[14px] h-[14px]" />
            Edit
          </Link>
          <Link
            to="#"
            onClick={showConfirm}
            className="flex items-center gap-x-1.5 bg-white dark:bg-white10 dark:hover:bg-white30 text-danger h-[35px] px-[14px] text-xs font-medium border border-normal dark:border-white10 rounded-md transition duration-300"
          >
            <UilTrashAlt className="w-[14px] h-[14px]" />
            Remove
          </Link>
        </div>
      </div>
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-[30px] ssm:px-[15px]  pb-[20px]">
        <Row gutter={25}>
          <Col xxl={8} xl={8} xs={24}>
            <div className="bg-white h-full dark:bg-white10 mb-[25px] p-[25px] rounded-[10px] gap-[25px] flex flex-wrap min-xl:flex-col xl:justify-between">
              <div className="flex items-center gap-x-5">
                <Link
                  to="#"
                  className="flex items-center justify-center bg-warning text-primary w-[60px] h-[60px] rounded-xl"
                >
                  <UilListUl className="w-[25px] h-[25px]" />
                </Link>
                <div>
                  <Heading as="h5" className="text-dark dark:text-white87 text-[20px] font-semibold mb-[3px]">
                    0
                  </Heading>
                  <p className="mb-0 text-body dark:text-white60">Total Devices</p>
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
                    0
                  </Heading>
                  <p className="mb-0 text-body dark:text-white60">Total Sampling Points</p>
                </div>
              </div>
              {/* <div className="flex items-center gap-x-5">
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
              </div> */}
            </div>
          </Col>
          <Col xxl={16} xl={16} xs={24}>
            <div className="bg-white h-full dark:bg-white10 min-4xl:min-h-[485px] mb-[25px] rounded-[10px]">
              <div className="px-[25px] py-[18px] border-b border-regular dark:border-white10">
                <Heading as="h3" className="m-0 text-lg font-semibold text-dark dark:text-white87">
                  About Project
                </Heading>
              </div>
              <div className="p-[25px]">
                <div>
                  <p className="text-body dark:text-white60">{description}</p>
                </div>
                <div className="grid grid-cols-2 mt-[42px] gap-x-4 gap-y-[8px] flex-wrap">
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Project Title</span>
                    <p className="font-medium text-body dark:text-white60">{title}</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Sequence Interval</span>
                    <p className="font-medium text-body dark:text-white60">{sequenceInterval}</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">projectHash</span>
                    <p className="font-medium text-primary">{projectHash}</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Project Configuration</span>
                    <p className="font-medium text-primary">{projectConfiguration.description}</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Short name</span>
                    <p className="font-medium text-primary">{shortname}</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Temporality</span>
                    <p className="font-medium text-primary">{temporality}</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Contacts</span>
                    <p className="font-medium text-primary">{contacts}</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Duration</span>
                    <p className="font-medium text-primary">{duration}</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Countries</span>
                    <p className="font-medium text-primary">{countries.map((country) => country.name)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {/* <Col xxl={8} xs={24}>
            <FileListCard />
          </Col> */}
        </Row>
        <CreateProject
          onCancel={onCancel}
          id={params.id}
          projects={allProjects}
          visible={visible}
          onCreateProject={handleCreateProject}
        />
      </main>
    </>
  );
}

export default ProjectDetails;
