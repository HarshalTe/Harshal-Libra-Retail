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
  Label
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
import { leavesPostData } from "../../../Redux/Creators/LeaveCreators";
import moment from "moment";

function CreateLeave(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    
    // ? FormData Chahiye File Upload hai
    // const data = new FormData();
    // data.append("employee_id", values.employee_id);
    // data.append("expense_type", values.expense_type);
    // // data.append("reason", values.reason);
    // data.append("is_approved", values.is_approved);
    // data.append("file_upload", values.file_upload);
    let data = {
      employee_id:values.employee_id,
      date: values.date,
      till_date: values.till_date,
      reason: values.reason,
      is_approved: values.is_approved,
    };
    console.log("Values In Upload file:",data, values);

    props.leavesPostData(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Add Leaves" placement="right" className="m-2" style={{float:"right"}}>
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="ml-2"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="small" />}
        >
          {/* <CloudUploadIcon fontSize="medium" /> */}
          Create Leave Management
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Leaves</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
                employee_id: "",
              expense_type:"",
              reason:"",
              date:moment().format("YYYY-MM-DD"),
              till_date:moment().format("YYYY-MM-DD"),
              is_approved:"",
              file_upload:""
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            //   pincode: Yup.string().required("Pincode is required"),
            //   instrcutions: Yup.string().required("Instructions is required"),
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                
                  <Col md={6} className="">
                  <Label>Employee Name</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        select
                        type="select"
                        size="small"
                        label="Employee Name"
                        id="employee_id"
                        name="employee_id"
                        value={formProps.values.employee_id}
                        onChange={formProps.handleChange}
                      >
                       <MenuItem value="">Select</MenuItem>
                      {props.users?.users?.data?.map((user , id)=>{
                         return(
                        <MenuItem value={user.id}>{user.name}</MenuItem>
                        )
                      })}
                    </TextField>
                    </Col>
                    <Col md={6} className="">
                    <Label>Reason</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Reason"
                        id="reason"
                        name="reason"
                        value={formProps.values.reason}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.reason &&
                          Boolean(formProps.errors.reason)
                        }
                        helperText={
                          formProps.touched.reason &&
                          formProps.errors.reason
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>From Date</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="date"
                        label="From Date"
                        id="date"
                        name="date"
                        value={formProps.values.date}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.date &&
                          Boolean(formProps.errors.date)
                        }
                        helperText={
                          formProps.touched.date &&
                          formProps.errors.date
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Till Date</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="date"
                        label="Till Date"
                        id="till_date"
                        name="till_date"
                        value={formProps.values.till_date}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.till_date &&
                          Boolean(formProps.errors.till_date)
                        }
                        helperText={
                          formProps.touched.till_date &&
                          formProps.errors.till_date
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Approved</Label>
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        size="small"
                        label="Approved"
                        id="is_approved"
                        name="is_approved"
                        value={formProps.values.is_approved}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.is_approved &&
                          Boolean(formProps.errors.is_approved)
                        }
                        helperText={
                          formProps.touched.is_approved &&
                          formProps.errors.is_approved
                        }
                      >
                      <MenuItem value="">Select</MenuItem>
                        <MenuItem value={0}>{"No"}</MenuItem>
                        <MenuItem value={1}>{"Yes"}</MenuItem>
                    </TextField>
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
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    leavesPostData: (data,token) => dispatch(leavesPostData(data,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateLeave);