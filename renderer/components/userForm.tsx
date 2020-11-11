import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
  Grid,
  TextField,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export interface UserFormProps {
  open: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  saveButton: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
    "&:disabled": {
      backgroundColor: theme.palette.success.light,
    },
  },
}));

const UserSchema = Yup.object().shape({
  username: Yup.string().required().max(50).label("Username"),
  birthdate: Yup.date().required().label("Birthdate"),
  age: Yup.number().required().min(5).label("Age"),
});

const InitialValues = {
  username: "",
  birthdate: new Date(),
  age: "",
};

const UserForm = (props: UserFormProps) => {
  const classes = useStyles();
  const { open, handleClose } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">User Form</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={InitialValues}
            validationSchema={UserSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        label="Username"
                        error={errors.username ? true : false}
                        name="username"
                        as={TextField}
                        variant="outlined"
                        autoFocus
                        fullWidth
                        helperText={errors.username}
                        placeholder="Username"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        autoOk
                        inputVariant="outlined"
                        label="Birthdate"
                        error={errors.birthdate ? true : false}
                        name="birthdate"
                        format="MM/dd/yyyy"
                        as={KeyboardDatePicker}
                        fullWidth
                        helperText={errors.birthdate}
                        placeholder="Birthdate"
                        InputAdornmentProps={{ position: "end" }}
                        onChange={(value: any) =>
                          setFieldValue("birthdate", value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        label="Age"
                        error={errors.age ? true : false}
                        name="age"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        helperText={errors.age}
                        placeholder="Age"
                        type="number"
                      />
                    </Grid>
                  </Grid>
                </Form>
              </MuiPickersUtilsProvider>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            className={classes.saveButton}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserForm;
