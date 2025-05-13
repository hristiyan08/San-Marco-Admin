import supabase from "@/utils/supabase/client2";

export default async function ResetPassword(profile: any) {
  const email = profile.email;

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.href}../../resetPassword`, // по-добре от window.location.href
  });

  if (error) {
    console.error("Error sending reset email:", error.message);
    alert("Failed to send reset email.");
  } else {
    console.log("Password reset email sent successfully");
    alert("Password reset email sent successfully.");
  }
}
