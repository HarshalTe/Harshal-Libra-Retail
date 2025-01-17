import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { editUnderConstructProject } from "../../../Redux/Creators/UnderConstructionProjectsCreators";

function EditUnderConstructProjects(props) {
  const token = props.login?.login?.token;
  console.log("Under Construct Edit", props.data);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Under Construct Projects Edit:", values);

    let data = {
      token: token,
      pageno: props.data2.pageno,
      pageSize: props.data2.pageSize,
      id: props.data.id,
      broker_name: values.broker_name,
      project_name: values.project_name,
      mobile_no: values.mobile_no,
      rent: values.rent,
      carpet_area: values.carpet_area,
      market_value: values.market_value,
      date: values.date,
    };

    props.editUnderConstructProject(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Edit Projects" placement="top">
        <Button
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
          onClick={() => toggle()}
        >
          <EditIcon fontSize="medium" />
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Edit External Data</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              broker_name: props?.data?.broker_name,
              project_name: props?.data?.project_name,
              mobile_no: props?.data?.mobile_no,
              rent: props?.data?.rent,
              carpet_area: props?.data?.carpet_area,
              market_value: props?.data?.market_value,
              date: props?.data?.date,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              project_name: Yup.string().required("Project Name is required"),
              broker_name: Yup.string().required("Broker Name are required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Broker Name *"
                      id="broker_name"
                      name="broker_name"
                      value={formProps.values.broker_name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.broker_name &&
                        Boolean(formProps.errors.broker_name)
                      }
                      helperText={
                        formProps.touched.broker_name &&
                        formProps.errors.broker_name
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Project Name *"
                      id="project_name"
                      name="project_name"
                      value={formProps.values.project_name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.project_name &&
                        Boolean(formProps.errors.project_name)
                      }
                      helperText={
                        formProps.touched.project_name &&
                        formProps.errors.project_name
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="mobile_no"
                      name="mobile_no"
                      label="Mobile No."
                      value={formProps.values.mobile_no}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.mobile_no &&
                        Boolean(formProps.errors.mobile_no)
                      }
                      helperText={
                        formProps.touched.mobile_no &&
                        formProps.errors.mobile_no
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Rent"
                      id="rent"
                      name="rent"
                      value={formProps.values.rent}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.rent && Boolean(formProps.errors.rent)
                      }
                      helperText={
                        formProps.touched.rent && formProps.errors.rent
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Carpet Area"
                      id="carpet_area"
                      name="carpet_area"
                      value={formProps.values.carpet_area}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.carpet_area &&
                        Boolean(formProps.errors.carpet_area)
                      }
                      helperText={
                        formProps.touched.carpet_area &&
                        formProps.errors.carpet_area
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Market Value"
                      id="market_value"
                      name="market_value"
                      value={formProps.values.market_value}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.market_value &&
                        Boolean(formProps.errors.market_value)
                      }
                      helperText={
                        formProps.touched.market_value &&
                        formProps.errors.market_value
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      type="date"
                      size="small"
                      variant="outlined"
                      id="date"
                      name="date"
                      label="Date"
                      value={formProps.values.date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.date && Boolean(formProps.errors.date)
                      }
                      helperText={
                        formProps.touched.date && formProps.errors.date
                      }
                    />
                  </Col>
                </Row>

                <Divider />

                <Row className="pt-4 pd-4">
                  <Col md={6}>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Col>

                  <Col md={6}>
                    <Button
                      color="error"
                      variant="contained"
                      fullWidth
                      onClick={() => toggle()}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUnderConstructProject: (data) =>
      dispatch(editUnderConstructProject(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUnderConstructProjects);
