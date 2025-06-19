import classes from './StitchDataForm.module.css';

export default function StitchDataForm({ id, initialData }) {
  return (
    <body className={classes.body}>
      <div className='container mx-auto p-4 sm:p-8'>
        <div className='bg-white p-6 sm:p-8 rounded-lg shadow-lg'>
          <h1 className='text-2xl font-bold text-center text-blue-800 mb-8'>
            Stitchs Insurance Policy Registration Form
          </h1>
          <section className='mb-8'>
            <h2 className='form-section-title'>Identification Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='form-label' for='nationalId'>
                  National Id
                </label>
                <input
                  className='form-input'
                  id='nationalId'
                  name='nationalId'
                  placeholder='National Id'
                  type='text'
                />
              </div>
              <div>
                <label className='form-label' for='idType'>
                  Type of Identification
                </label>
                <input
                  className='form-input'
                  id='idType'
                  name='idType'
                  placeholder='Type of Identification'
                  type='text'
                />
              </div>
            </div>
          </section>
          <section className='mb-8'>
            <h2 className='form-section-title'>Personal Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div>
                <label className='form-label' for='firstName'>
                  First Name
                </label>
                <input
                  className='form-input'
                  id='firstName'
                  name='firstName'
                  placeholder='First Name'
                  type='text'
                />
              </div>
              <div>
                <label className='form-label' for='middleName'>
                  Middle Name
                </label>
                <input
                  className='form-input'
                  id='middleName'
                  name='middleName'
                  placeholder='Middle Name'
                  type='text'
                />
              </div>
              <div>
                <label className='form-label' for='lastName'>
                  Last Name
                </label>
                <input
                  className='form-input'
                  id='lastName'
                  name='lastName'
                  placeholder='Last Name'
                  type='text'
                />
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
              <div className='relative'>
                <label className='form-label' for='birthday'>
                  Birthday
                </label>
                <input
                  className='form-input'
                  id='birthday'
                  name='birthday'
                  placeholder='mm/dd/yyyy'
                  type='text'
                />
                <div className='form-input-icon'>
                  <span className='material-icons text-gray-400'>
                    calendar_today
                  </span>
                </div>
              </div>
              <div>
                <label className='form-label' for='gender'>
                  Gender
                </label>
                <select className='form-input' id='gender' name='gender'>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </section>
          <section className='mb-8'>
            <h2 className='form-section-title'>Contact Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div>
                <label className='form-label' for='email'>
                  Email
                </label>
                <input
                  className='form-input'
                  id='email'
                  name='email'
                  placeholder='Email'
                  type='email'
                />
              </div>
              <div>
                <label className='form-label' for='telephone'>
                  Telephone
                </label>
                <input
                  className='form-input'
                  id='telephone'
                  name='telephone'
                  placeholder='Telephone'
                  type='tel'
                />
              </div>
              <div>
                <label className='form-label' for='address'>
                  Address
                </label>
                <input
                  className='form-input'
                  id='address'
                  name='address'
                  placeholder='Address'
                  type='text'
                />
              </div>
            </div>
          </section>
          <section className='mb-8'>
            <h2 className='form-section-title'>Spouse Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='form-label' for='spouseFullName'>
                  Spouse FullName
                </label>
                <input
                  className='form-input'
                  id='spouseFullName'
                  name='spouseFullName'
                  placeholder='spouseFullName'
                  type='text'
                />
              </div>
              <div className='relative'>
                <label className='form-label' for='spouseBirthday'>
                  Spouse Birthday
                </label>
                <input
                  className='form-input'
                  id='spouseBirthday'
                  name='spouseBirthday'
                  placeholder='mm/dd/yyyy'
                  type='text'
                />
                <div className='form-input-icon'>
                  <span className='material-icons text-gray-400'>
                    calendar_today
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className='mb-8'>
            <h2 className='form-section-title'>Children Details</h2>
            <div id='childrenContainer'>
              <div className='grid grid-cols-1 md:grid-cols-[3fr_2fr_auto] gap-6 items-end mb-4 child-entry'>
                <div>
                  <label className='form-label' for='childFullName1'>
                    Full Name:
                  </label>
                  <input
                    className='form-input'
                    id='childFullName1'
                    name='childFullName1'
                    placeholder='child-[1] fullname'
                    type='text'
                  />
                </div>
                <div className='relative'>
                  <label className='form-label' for='childBirthday1'>
                    Birthday:
                  </label>
                  <input
                    className='form-input'
                    id='childBirthday1'
                    name='childBirthday1'
                    placeholder='mm/dd/yyyy'
                    type='text'
                  />
                  <div className='form-input-icon'>
                    <span className='material-icons text-gray-400'>
                      calendar_today
                    </span>
                  </div>
                </div>
                <button
                  className='btn-danger-outline p-2 rounded-md flex items-center justify-center self-end mb-1 h-10 w-10'
                  type='button'
                >
                  <span className='material-icons'>delete</span>
                </button>
              </div>
            </div>
            <button
              className='btn bg-green-500 hover:bg-green-600 text-white mt-2'
              type='button'
            >
              <span className='material-icons mr-2'>add_circle_outline</span>
              Add Another Child
            </button>
          </section>
          <section className='mb-8'>
            <h2 className='form-section-title'>Parent Details</h2>
            <div id='parentsContainer'>
              <div className='grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_auto] gap-6 items-end mb-4 parent-entry'>
                <div>
                  <label className='form-label' for='parentFullName1'>
                    Full Name:
                  </label>
                  <input
                    className='form-input'
                    id='parentFullName1'
                    name='parentFullName1'
                    placeholder='parent-[1] fullname'
                    type='text'
                  />
                </div>
                <div className='relative'>
                  <label className='form-label' for='parentBirthday1'>
                    Birthday:
                  </label>
                  <input
                    className='form-input'
                    id='parentBirthday1'
                    name='parentBirthday1'
                    placeholder='mm/dd/yyyy'
                    type='text'
                  />
                  <div className='form-input-icon'>
                    <span className='material-icons text-gray-400'>
                      calendar_today
                    </span>
                  </div>
                </div>
                <div>
                  <label className='form-label' for='parentRelation1'>
                    Relation:
                  </label>
                  <select
                    className='form-input'
                    id='parentRelation1'
                    name='parentRelation1'
                  >
                    <option>Mother</option>
                    <option>Father</option>
                    <option>Guardian</option>
                  </select>
                </div>
                <button
                  className='btn-danger-outline p-2 rounded-md flex items-center justify-center self-end mb-1 h-10 w-10'
                  type='button'
                >
                  <span className='material-icons'>delete</span>
                </button>
              </div>
            </div>
            <button
              className='btn btn-primary mt-2 bg-purple-600 hover:bg-purple-700'
              type='button'
            >
              <span className='material-icons mr-2'>add_circle_outline</span>
              Add Another Parent
            </button>
          </section>
          <section className='mb-8'>
            <h2 className='form-section-title'>Undertaking</h2>
            <div className='mb-4'>
              <label className='form-label'>
                Do you or your relatives listed have any ongoing illness or
                condition?
              </label>
              <textarea
                className='form-input'
                id='healthConditions'
                name='healthConditions'
                placeholder='Known Health Conditions'
                rows='3'
              ></textarea>
            </div>
            <div className='flex items-center'>
              <input
                className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                id='declaration'
                name='declaration'
                type='checkbox'
              />
              <label
                className='ml-2 block text-sm text-gray-900'
                for='declaration'
              >
                I declare that the information provided is true, accurate and
                complete to the best of my belief and knowledge
              </label>
            </div>
          </section>
          <div className='flex justify-end space-x-4 pt-6 border-t border-gray-200'>
            <button className='btn btn-secondary' type='button'>
              CANCEL
            </button>
            <button className='btn btn-primary' type='submit'>
              REGISTER
            </button>
          </div>
        </div>
      </div>
    </body>
  );
}
