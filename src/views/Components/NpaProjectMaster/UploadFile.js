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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import {
  negativeProjectsEditData,
  negativeProjectsEditData2,
} from "../../../Redux/Creators/NegativeProjectsCreators";

function UploadFile(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Negative Projects Upload firl:", values);

    //? FormData Chahiye File Upload hai

    const data = new FormData();
    data.append("token", token);
    data.append("pageno", props.data.pageno);
    data.append("pageSize", props.data.pageSize);
    data.append("id", props.data.id);
    data.append("file", values.file);

    // props.negativeProjectsEditData(data);
    props.negativeProjectsEditData2(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Upload File" placement="left">
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="p-1"
          onClick={() => toggle()}
          // startIcon={<CloudUploadIcon fontSize="inherit" />}
        >
          <CloudUploadIcon fontSize="medium" />
          {/* Upload */}
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Upload Negative Projects</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              file: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              file: Yup.string().required("File is required"),
            })}
          >
            {(formProps) => (
              <Form encType="multipart/form-data">
                <Row>
                  <Col md={12} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      type="file"
                      size="small"
                      variant="outlined"
                      focused
                      id="file"
                      name="file"
                      label="File Upload"
                      onChange={(event) => {
                        formProps.setFieldValue(
                          "file",
                          event.currentTarget.files[0]
                        );
                        console.log("file", formProps.values.file);
                      }}
                      error={
                        formProps.touched.file && Boolean(formProps.errors.file)
                      }
                      helperText={
                        formProps.touched.file && formProps.errors.file
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
    negativeProjectsEditData: (data) =>
      dispatch(negativeProjectsEditData(data)),
    negativeProjectsEditData2: (data) =>
      dispatch(negativeProjectsEditData2(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile);