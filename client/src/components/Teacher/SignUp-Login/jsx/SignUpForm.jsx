import { useState } from "react";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import styles from "../css/SignupForm.module.css";
import { IonIcon } from "@ionic/react";
import { personOutline, mailOutline, callOutline, calendarOutline, accessibilityOutline, createOutline, briefcaseOutline, businessOutline, peopleOutline, schoolOutline, libraryOutline, lockClosedOutline, logoFirebase, closeOutline, menuOutline } from "ionicons/icons";
import { authApi } from "../../../../api/authApi.js"

function SignupFormTeacher() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    dob: "",
    gender: "",
    about: "",
    profession: "",
    worksAt: "",
    job_role: "",
    qualification: "",
    qualifying_institution: "",
    password: "",
    confirm_password: ""
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  }

  function validateField(name, value) {
    switch (name) {
      case "name":
        if (!value.trim()) return "Full Name is required";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email address";
        break;
      case "phone_no":
        if (!value.trim()) return "Phone Number is required";
        if (!/^\d{10}$/.test(value)) return "Phone Number must be 10 digits";
        break;
      case "dob":
        if (!value.trim()) return "Date of Birth is required";
        break;
      case "gender":
        if (!value.trim()) return "Gender is required";
        break;
      case "password":
        if (!value.trim()) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        break;
      case "confirm_password":
        if (!value.trim()) return "Please confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        break;
      default:
        return "";
    }
  }

  function validateStep(step) {
    const fieldsByStep = [
      ["name", "email", "phone_no", "dob"],
      ["gender", "about", "profession"],
      ["worksAt", "job_role", "qualification", "qualifying_institution"],
      ["password", "confirm_password"]
    ];

    const stepFields = fieldsByStep[step];
    const newErrors = {};

    stepFields.forEach(field => {
      const errMsg = validateField(field, formData[field]);
      if (errMsg) newErrors[field] = errMsg;
    });

    setErrors(prev => ({ ...prev, ...newErrors }));

    if (Object.keys(newErrors).length > 0) {
      return "Error is there";
    }
    return "";
  }

  function nextStep() {
    const errorMsg = validateStep(currentStep);
    if (errorMsg) {
      return;
    }
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, phone_no, dob, gender, about, profession, worksAt, job_role, qualification, qualifying_institution, password } = formData;

    const teacherData = {
      name,
      email,
      phone_no,
      gender,
      dob,
      about: about || undefined,
      profession: profession || undefined,
      worksAt: worksAt || undefined,
      job_role: job_role || undefined,
      academic_details: (qualification || qualifying_institution) ? [{ qualification, qualifying_institution }] : undefined,
      password
    };

    authApi.post("/teacher/generateOTP", { email: teacherData.email, name: teacherData.name })
      .then((res) => {
        if (res.data?.success === true) {
          setFormData({
            name: "", email: "", phone_no: "", dob: "", gender: "",
            about: "", profession: "", worksAt: "", job_role: "",
            qualification: "", qualifying_institution: "", password: "", confirm_password: ""
          });

          toast.info(res.data?.message);
          navigate(`/teachers/email-verification`, { state: { teacherData } });
        } else {
          toast.error(res.data?.message || "Something went wrong");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in verification:', error);
        toast.error("Failed: Something went wrong");
      });
  };


  const formSteps = [
    <>
      <div className={styles.signup_input_box}>
        <span className={styles.signup_icon}><IonIcon icon={personOutline} /></span>
        <input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} required />
        <label>Full Name</label>
        {errors.name && <span className={styles.error_message}>{errors.name}</span>}
      </div>
      <div className={styles.signup_input_box}>
        <span className={styles.signup_icon}><IonIcon icon={mailOutline} /></span>
        <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} required />
        <label>Email</label>
        {errors.email && <span className={styles.error_message}>{errors.email}</span>}
      </div>
      <div className={styles.signup_input_box}>
        <span className={styles.signup_icon}><IonIcon icon={callOutline} /></span>
        <input type="tel" name="phone_no" value={formData.phone_no} onChange={handleChange} onBlur={handleBlur} required />
        <label>Phone Number</label>
        {errors.phone_no && <span className={styles.error_message}>{errors.phone_no}</span>}
      </div>
      <div className={styles.signup_input_box}>
        <span className={styles.signup_icon}><IonIcon icon={calendarOutline} /></span>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} onBlur={handleBlur} required />
        <label>Date of Birth</label>
        {errors.dob && <span className={styles.error_message}>{errors.dob}</span>}
      </div>
      <div className={styles.signup_btn_group}>
        <button type="button" className={styles.signup_btn} onClick={nextStep}>Next</button>
      </div>
    </>,

    <>
      <div className={styles.signup_input_box}>
        <span className={styles.signup_icon}><IonIcon icon={accessibilityOutline} /></span>
        <select name="gender" value={formData.gender} onChange={handleChange} onBlur={handleBlur} required>
          <option value="" disabled hidden>Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label>Gender</label>
        {errors.gender && <span className={styles.error_message}>{errors.gender}</span>}
      </div>
      <div className={styles.signup_input_box}>
        <span className={styles.signup_icon}><IonIcon icon={createOutline} /></span>
        <textarea name="about" value={formData.about} onChange={handleChange} onBlur={handleBlur} placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yourself.."></textarea>
        <label>About</label>
      </div>
      <div className={styles.signup_input_box}>
        <span className={styles.signup_icon}><IonIcon icon={briefcaseOutline} /></span>
        <input type="text" name="profession" value={formData.profession} onChange={handleChange} onBlur={handleBlur} />
        <label>Profession</label>
      </div>
      <div className={styles.signup_btn_group}>
        <button type="button" className={styles.signup_btn} onClick={prevStep}>Back</button>
        <button type="button" className={styles.signup_btn} onClick={nextStep}>Next</button>
      </div>
    </>,

    <>
      <div className={styles.signup_input_box}>
        <span className={styles.signup_icon}><IonIcon icon={businessOutline} /></span>
        <input type="text" name="worksAt" value={formData.worksAt} onChange={handleChange} onBlur={handleBlur} />
        <label>Works At</label>
      </div>
      <div className={styles.signup_input_box}>
        <span className={styles.signup_icon}><IonIcon icon={peopleOutline} /></span>
        <input type="text" name="job_role" value={formData.job_role} onChange={handleChange} onBlur={handleBlur} />
        <label>Job Role</label>
      </div>
      <div className={styles.signup_input_box}>
        <span className={styles.signup_icon}><IonIcon icon={schoolOutline} /></span>
        <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} onBlur={handleBlur} />
        <label>Highest Qualification</label>
      </div>
      <div className={styles.signup_input_box}>
        <span className={styles.signup_icon}><IonIcon icon={libraryOutline} /></span>
        <input type="text" name="qualifying_institution" value={formData.qualifying_institution} onChange={handleChange} onBlur={handleBlur} />
        <label>Qualifying Institution</label>
      </div>
      <div className={styles.signup_btn_group}>
        <button type="button" className={styles.signup_btn} onClick={prevStep}>Back</button>
        <button type="button" className={styles.signup_btn} onClick={nextStep}>Next</button>
      </div>
    </>,

    <>
      <div className={styles.signup_input_box}>
        <span className={styles.signup_icon}><IonIcon icon={lockClosedOutline} /></span>
        <input type="password" name="password" value={formData.password} onChange={handleChange} onBlur={handleBlur} required />
        <label>Password</label>
        {errors.password && <span className={styles.error_message}>{errors.password}</span>}
      </div>
      <div className={styles.signup_input_box}>
        <span className={styles.signup_icon}><IonIcon icon={lockClosedOutline} /></span>
        <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} onBlur={handleBlur} required />
        <label>Confirm Password</label>
        {errors.confirm_password && <span className={styles.error_message}>{errors.confirm_password}</span>}
      </div>
      <div className={styles.signup_btn_group}>
        <button type="button" className={styles.signup_btn} onClick={prevStep}>Back</button>
        <button type="submit" className={styles.signup_btn} disabled={loading}>{loading ? 'Wait a moment..' : 'Verify'}</button>
      </div>
    </>
  ];

  return (
    <div className={styles.signup_body}>
      <header className={styles.signup_header}>
        <Link to="#" className={styles.signup_logo}>
          <IonIcon icon={logoFirebase} />
          LearnToKnow
        </Link>

        {/* Hamburger Icon */}
        <div className={styles.login_menu_icon} onClick={() => setSidebarOpen(true)}>
          <IonIcon icon={menuOutline} />
        </div>

        <nav className={styles.signup_nav}>
          <Link to="/home" onClick={() => setSidebarOpen(false)}>Home</Link>
          <Link to="/about-us" onClick={() => setSidebarOpen(false)}>About Us</Link>
          <Link to="/our-goal" onClick={() => setSidebarOpen(false)}>Our Gola</Link>
          <Link to="/contact-us" onClick={() => setSidebarOpen(false)}>Contact Us</Link>
          <Link to="/teachers/login" onClick={() => setSidebarOpen(false)}>Login</Link>
        </nav>
      </header>

      {/* Sidebar for small screens */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.active : ''}`}>
        <div className={styles.close_btn} onClick={() => setSidebarOpen(false)}>
          <IonIcon icon={closeOutline} />
        </div>
        <Link to="#" onClick={() => setSidebarOpen(false)}>Home</Link>
        <Link to="#" onClick={() => setSidebarOpen(false)}>About Us</Link>
        <Link to="#" onClick={() => setSidebarOpen(false)}>Contact Us</Link>
        <Link to="/teachers/login" onClick={() => setSidebarOpen(false)}>Login</Link>
      </div>

      <section className={styles.signup_home}>
        <div className={styles.signup_wrapper_login}>
          <h2>Teachers' Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.form_step}>{formSteps[currentStep]}</div>
          </form>
        </div>
        <div className={styles.signup_content}>
          <h3>Join our community today!</h3>
          <p>A teacher plants seeds of knowledge, nurturing minds with patience and heart...</p>
          <Link className={styles.leranmorelink} to="#">Learn More</Link>
        </div>
      </section>
    </div>
  );
}

export default SignupFormTeacher;
