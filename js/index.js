  let fullNameInput = document.getElementById("fullname");
  let phoneNumberInput = document.getElementById("phonenumber");
  let emailInput = document.getElementById("emailaddress");
  let groupInput = document.getElementById("group");
  let notesInput = document.getElementById("notes");
  let checkDefaultfavInput = document.getElementById("checkDefaultfav");
  let CheckedemergencyInput = document.getElementById("Checkedemergency");
  let favbox=document.getElementById('favbox')
  let searchInput= document.getElementById('search');
  let contactList=[]

function openmodal() {
  document.getElementById("modalcontainer").innerHTML = `<div class="overlay">
           <div class="add-contact">
        <form>
          <h3>Add New Contact</h3>
          <i class="fa-solid fa-user"></i>
          <div class="mb-3">
            <label for="fullname" class="form-label mt-5">Full Name</label>
            <input
              placeholder="Enter Full name"
              type="text"
              class="form-control"
              id="fullname"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="phonenumber" class="form-label">Phone number</label>
            <input
              placeholder="e.g 01033495154"
              type="tel"
              class="form-control"
              id="phonenumber"
            />
          </div>
          <div class="mb-3">
            <label for="emailaddress" class="form-label">Email Address</label>
            <input
              placeholder="name@example.com"
              type="email"
              class="form-control"
              id="emailaddress"
            />
          </div>
          <div class="mb-3">
            <label for="group" class="form-label">group</label>
            <input
              list="group"
              placeholder="select a group"
              class="form-control"
              id="group"
            />
            <datalist id="group">
              <option value="select a group"></option>
              <option value="Family"></option>
              <option value="Friends"></option>
              <option value="Work"></option>
              <option value="School"></option>
              <option value="Other"></option>
            </datalist>
          </div>
          <div class="mb-3">
            <label for="notes" class="form-label">Notes</label>
            <input
              placeholder="add notes about this contact"
              type="text"
              class="form-control"
              id="notes"
            />
          </div>
          <div class="mb-3"></div>
                <div class="d-flex gap-4">
          <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="checkDefaultfav">
  <label class="form-check-label" for="checkDefaultfav">
    <i class="fa-solid fa-star"></i>
    Favorite
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="Checkedemergency" checked>
  <label class="form-check-label" for="Checkedemergency">
    <i class="fa-solid fa-heart-pulse"></i>
    Emergency
  </label>
</div>
</div>
<div class="d-flex justify-content-between pt-3">
<button onclick='closemodal()' type="button" class="btn  cancel-btn">Cancel</button>  
<button id='savecontactbtn' onclick='savecontact()' type="button" class="btn  save-btn"><i class="fa-solid fa-check"></i> Save Contact</button>
<button id='updatecontactbtn' onclick='updatecontact()' type="button" class="btn  save-btn d-none"><i class="fa-solid fa-check"></i> Update Contact</button>
</div>
        </form>

      </div>
      </div>`;
  fullNameInput = document.getElementById("fullname");
  phoneNumberInput = document.getElementById("phonenumber");
  emailInput = document.getElementById("emailaddress");
  groupInput = document.getElementById("group");
  notesInput = document.getElementById("notes");
  checkDefaultfavInput = document.getElementById("checkDefaultfav");
  CheckedemergencyInput = document.getElementById("Checkedemergency");
}
    
function savecontact() {
  if (!validateContact()) return;

  contactList.push({
    name: fullNameInput.value,
    phone: phoneNumberInput.value,
    email: emailInput.value,
    group: groupInput.value,
    notes: notesInput.value,
    favorite: checkDefaultfavInput.checked
  });

  localStorage.setItem("contactcontainer", JSON.stringify(contactList));
  displaycontact();
  nodata();
  closemodal();

  Swal.fire({
    title: "Success",
    text: "Contact added successfully",
    icon: "success",
    confirmButtonColor: "#28a745"
  });
}

function validateContact() {
  if (fullNameInput.value.trim().length < 3) {
    Swal.fire({
      title: "Error",
      text: "Name must be at least 3 characters",
      icon: "error",
      confirmButtonColor: "#d33"
    });
    return false;
  }

  if (!/^01[0-9]{9}$/.test(phoneNumberInput.value)) {
    Swal.fire({
      title: "Error",
      text: "Phone number must be 11 digits starting with 01",
      icon: "error",
      confirmButtonColor: "#d33"
    });
    return false;
  }

  if (contactList.some((c, i) => c.phone === phoneNumberInput.value && i !== asd)) {
    Swal.fire({
      title: "Error",
      text: "Phone number already exists",
      icon: "warning",
      confirmButtonColor: "#d33"
    });
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    Swal.fire({
      title: "Error",
      text: "Email is invalid",
      icon: "error",
      confirmButtonColor: "#d33"
    });
    return false;
  }

  if (groupInput.value.trim() === "" || groupInput.value === "select a group") {
    Swal.fire({
      title: "Error",
      text: "Group is required",
      icon: "error",
      confirmButtonColor: "#d33"
    });
    return false;
  }

  return true;
}



function closemodal() {
  document.getElementById("modalcontainer").innerHTML = "";
  clearcontact()
}


function clearcontact(){
   fullNameInput.value=null
   phoneNumberInput.value=null
   emailInput.value=null
   groupInput.value=null
   notesInput.value=null
   checkDefaultfavInput.checked=false
   CheckedemergencyInput.checked=false
   nodata()
}

function displaycontact(){
  let cartona=''
  for(let i=0 ; i<contactList.length ;i++){
    cartona+=`<div class="col-lg-6">
               <div class="contact-box card rounded-4">
                <div>
                  <div class="d-flex align-items-center">
                      <p class="box-name fs-2 m-3 p-2 rounded-4 text-white bg-danger text-center">${contactList[i].name[0]}</p>
                      <div>
                        <p class="m-1 fs-2 fw-bolder text-capitalize">${contactList[i].name}</p>
                        <div class="d-flex align-items-center gap-2">
                          <i class="fa-solid fa-phone"></i>
                          <p class="m-0 fw-bolder">${contactList[i].phone}</p>
                        </div>
                      </div>
                  </div>
                    <div class="ms-3 mt-3">
                      <div class="d-flex gap-3 mb-3">
                      <i class="fa-solid fa-envelope"></i>
                      <p class="m-0 text-secondary">${contactList[i].email}</p>
                    </div>
                    <div class="d-flex gap-3 mb-3">
                      <i class="fa-solid fa-location-dot"></i>
                      <p class="m-0 text-secondary">${contactList[i].email}</p>
                    </div>
                    </div>
                     <div class="card-footer p-3  d-flex align-items-center justify-content-between">
                      <div class="d-flex gap-2">
                        <i class="fa-solid fa-phone phone-svg phone-footer"></i>
                        <i class="fa-solid fa-envelope envelope-footer"></i>
                      </div>
                      <div class="d-flex gap-2">
                        <i onclick='togglefavorite(${i})' class="fa-${contactList[i].favorite ? 'solid' : 'regular'} fa-star star-footer btn btn-outline-light"></i>
                        <i class="fa-regular fa-heart heart-footer btn btn-outline-light"></i>
                        <i onclick='setcontact(${i})' class="fa-solid fa-pen btn btn-outline-light"></i>
                        <i onclick='deletecontact(${i})' class="btn btn-outline-light fa-solid fa-trash-can"></i>
                      </div>
                     </div>
                </div>
               </div>
              </div> `
  }
  document.getElementById('rowdata').innerHTML=cartona
  
  let favcartoona=''
  let hasfav=false
  for(let i=0 ; i<contactList.length ; i++){
    if(contactList[i].favorite){
      hasfav=true
      favcartoona+=`
              <div class="d-flex  align-items-center justify-content-between  p-1 fav-box">
                <div class="d-flex gap-2">
                  <p class="p-3 rounded-3 bg-danger m-0 ms-2 ">${contactList[i].name[0]}</p>
                <div>
                  <p class="m-0">${contactList[i].name}</p>
                  <p class="m-0">${contactList[i].phone}</p>
                </div>
                </div>
                <i class="fa-solid fa-phone phone-svg me-2"></i>
              </div>
             `
    }
  }
 favbox.innerHTML = `
  <div class="card rounded-4 mb-3">
    <div class="favorite-add">
      <i class="fa-solid fa-star"></i>
      <div>
        <h4 class="m-0">Favorites</h4>
        <p class="text-secondary">Quick access to starred contacts</p>
      </div>
    </div>

    ${hasfav ? favcartoona : `
      <div class="d-flex justify-content-center">
        <p class="text-secondary text-center">No favorites yet</p>
      </div>
    `}
  </div>
`;

  }

function nodata() {
 let nocontact=
 document.getElementById('nocontact')
 if(contactList.length===0){
  nocontact.style.display='block'
 }
 else{
  nocontact.style.display='none'
 }
}

function deletecontact(index){
  contactList.splice(index,1)
  localStorage.setItem('contactcontainer',JSON.stringify(contactList))
  displaycontact()
  nodata()
}
function searchcontact(){
  let term = searchInput.value
   let cartona=''
  for(let i=0 ; i<contactList.length ;i++){
   if(
    contactList[i].name.toUpperCase().includes(term.toUpperCase())
    || contactList[i].phone.includes(term)
    || contactList[i].email.includes(term)
  ){
     cartona+=`<div class="col-lg-6">
               <div class="contact-box card rounded-4">
                <div>
                  <div class="d-flex align-items-center">
                      <p class="box-name fs-2 m-3 p-2 rounded-4 text-white bg-danger text-center">${contactList[i].name[0]}</p>
                      <div>
                        <p class="m-1 fs-2 fw-bolder text-capitalize">${contactList[i].name} </p>
                        <div class="d-flex align-items-center gap-2">
                          <i class="fa-solid fa-phone"></i>
                          <p class="m-0 fw-bolder">${contactList[i].phone}</p>
                        </div>
                      </div>
                  </div>
                    <div class="ms-3 mt-3">
                      <div class="d-flex gap-3 mb-3">
                      <i class="fa-solid fa-envelope"></i>
                      <p class="m-0 text-secondary">${contactList[i].email}</p>
                    </div>
                    <div class="d-flex gap-3 mb-3">
                      <i class="fa-solid fa-location-dot"></i>
                      <p class="m-0 text-secondary">${contactList[i].email}</p>
                    </div>
                    </div>
                     <div class="card-footer p-3  d-flex align-items-center justify-content-between">
                      <div class="d-flex gap-2">
                        <i class="fa-solid fa-phone phone-svg phone-footer"></i>
                        <i class="fa-solid fa-envelope envelope-footer"></i>
                      </div>
                      <div class="d-flex gap-2">
                        <i class="fa-regular fa-star star-footer btn btn-outline-light"></i>
                        <i class="fa-regular fa-heart heart-footer btn btn-outline-light"></i>
                        <i class="fa-solid fa-pen btn btn-outline-light"></i>
                        <i onclick='deletecontact(${i})' class="btn btn-outline-light fa-solid fa-trash-can"></i>
                      </div>
                     </div>
                </div>
               </div>
              </div>`
  }
   }
    document.getElementById('rowdata').innerHTML=cartona
}
let asd=0
function setcontact(index){
  openmodal()
asd = index
 fullNameInput.value=contactList[index].name
 phoneNumberInput.value=contactList[index].phone
 emailInput.value=contactList[index].email
 groupInput.value=contactList[index].group
 notesInput.value=contactList[index].notes
  let savecontactbtn=document.getElementById('savecontactbtn');
  let updatecontactbtn=document.getElementById('updatecontactbtn');
 savecontactbtn.classList.add('d-none')
 updatecontactbtn.classList.remove('d-none')
}
function updatecontact(){
   let contact={
      name:fullNameInput.value,
      phone:phoneNumberInput.value,
      email:emailInput.value,
      group:groupInput.value,
      notes:notesInput.value,
      favorite:checkDefaultfavInput.checked,
    }
    contactList.splice(asd , 1 , contact )
    localStorage.setItem('contactcontainer',JSON.stringify(contactList))
    displaycontact()
    closemodal()
}

function togglefavorite(index){
  contactList[index].favorite=!contactList[index].favorite;
  localStorage.setItem('contactcontainer',JSON.stringify(contactList));
  displaycontact()
}




//////////////////////////////////////////////////////////////////////////// 
document.addEventListener('DOMContentLoaded',function loaded(){
  contactList=
  JSON.parse(localStorage.getItem('contactcontainer'))||[]
  displaycontact()
  nodata()
}
)
