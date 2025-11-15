import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-slate-100">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-10 px-4">
                <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* PROFILE CARD */}
                        <div className="bg-slate-100 text-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200">
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">
                                Profile Information
                            </h3>

                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="space-y-6"
                            />
                        </div>

                        {/* PASSWORD CARD */}
                        <div className="bg-slate-100 text-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200">
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">
                                Change Password
                            </h3>

                            <UpdatePasswordForm className="space-y-6" />
                        </div>
                    </div>

                    {/* RIGHT COLUMN – DANGER ZONE */}
                    <div className="lg:col-span-4">
                        <div className="bg-red-50 text-red-900 p-8 rounded-2xl shadow-lg border border-red-200">
                            <h3 className="text-xl font-semibold mb-4">
                                Danger Zone
                            </h3>

                            <DeleteUserForm className="space-y-6" />
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
