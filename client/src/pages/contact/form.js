import { useRef, useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useFormik } from "formik";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import EmailIllustrationSrc from "images/email-illustration.svg";
import * as Yup from "yup";
import { sendContactMessage } from "reduxStore/actions";
import { useDispatch } from "react-redux";
import Alert from "components/alert";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-12 lg:mr-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`;
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`;
const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`;

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`;

const ContactForm = ({ textOnLeft = true }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const formRef = useRef();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Name is required")
        .required("Name is required"),
      subject: Yup.string()
        .min(1, "Subject is required")
        .required("Subject is required"),
      message: Yup.string()
        .min(1, "Message is required")
        .required("Message is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(sendContactMessage(values));
      formik.resetForm({ email: "", name: "", subject: "", message: "" });
      formRef.current.reset();
      setMessage("Contact form successfully posted");
    },
  });

  useEffect(() => {
    let tm;

    if (message) {
      tm = setTimeout(() => setMessage(""), 4000);
    }

    return () => clearTimeout(tm);
  }, [message]);

  return (
    <Container>
      {message && (
        <Alert message={message} type="success" cb={() => setMessage("")} />
      )}
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={EmailIllustrationSrc} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Subheading>Contact Us</Subheading>
            <Heading>
              <>
                Feel free to <span tw="text-primary-500">get in touch</span>
                <wbr /> with us.
              </>
            </Heading>
            <Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Description>
            <Form onSubmit={formik.handleSubmit} ref={formRef}>
              <Input
                type="email"
                name="email"
                placeholder="Your Email Address"
                onChange={formik.handleChange}
                defaultValue={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="error-footer">{formik.errors.email}</p>
              )}
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={formik.handleChange}
                defaultValue={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="error-footer">{formik.errors.name}</p>
              )}
              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                onChange={formik.handleChange}
                defaultValue={formik.values.subject}
              />
              {formik.touched.subject && formik.errors.subject && (
                <p className="error-footer">{formik.errors.subject}</p>
              )}
              <Textarea
                name="message"
                placeholder="Your Message Here"
                onChange={formik.handleChange}
                defaultValue={formik.values.message}
              />
              {formik.touched.message && formik.errors.message && (
                <p className="error-footer">{formik.errors.message}</p>
              )}
              <SubmitButton type="submit">Send</SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};

export default ContactForm;
