import { redirect } from "next/navigation";

const AdminDefaultPage = () => {
    redirect("/admin/medicines");

};

export default AdminDefaultPage;