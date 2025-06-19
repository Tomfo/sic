import axios from 'axios';
import { getMembersById } from '@/lib/members';
import MemberView from '@/components/MemberView';

export default async function ViewMemberDetailsPage({ params }) {
  const { id } = await params;
  const data = await getMembersById(id);
  //console.log(data);
  return <MemberView data={data} />;
}
