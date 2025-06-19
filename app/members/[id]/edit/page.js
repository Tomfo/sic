import MemberEditForm from '@/components/MemberEditForm';

import MemberView from '@/components/MemberView';
import StitchDataForm from '@/components/StitchDataForm';
import ViewMemberDetails from '@/components/ViewMemberDetails';
import { getMembersById } from '@/lib/members';
import { redirect } from 'next/navigation';
export default async function EditMemeberDetailsPage({ params }) {
  const { id } = await params;
  const data = await getMembersById(id);
  const initialData = {
    nationalId: data.nationalId,
    idType: data.idType,
    firstName: data.firstName,
    middleName: data.middleName,
    lastName: data.lastName,
    gender: data.gender,
    birthday: data.birthday.split('T')[0],
    spouseFullname: data.spouseFullname,
    spousebirthday: data.spousebirthday.split('T')[0],
    email: data.email,
    telephone: data.telephone,
    residence: data.residence,
    underlying: data.underlying,
    condition: data.condition,
    declaration: data.declaration,
    children: data.children.map((child) => ({
      id: child.id, // Crucial: Keep the ID for existing children
      fullName: child.fullName,
      birthday: child.birthday.split('T')[0],
    })),
    parents: data.parents.map((parent) => ({
      id: parent.id, // Crucial: Keep the ID for existing children
      fullName: parent.fullName,
      birthday: parent.birthday.split('T')[0],
      relationship: parent.relationship,
    })),
  };

  return <MemberEditForm id={id} initialData={initialData} />;
}
