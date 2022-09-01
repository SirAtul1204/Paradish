export const newUserHtmlTemplate = (
  name: string,
  token: string
) => `<div style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 1.5;">
  <div style="margin-bottom: 30px;">
    <p>Hi ${name},</p>
    <p>Your account has been created successfully.</p>
    <p>Your one time token to reset password is: <strong>${token}</strong></p>
    <p>Click the button below to set your password.</p>
    <div style="display: flex; justify-content: center;">
      <a href="${
        process.env.NEXT_PUBLIC_DEPLOYED_URL
          ? `https://${process.env.NEXT_PUBLIC_DEPLOYED_URL}/passwordReset`
          : `http://localhost:3000/passwordReset`
      }" style="text-decoration: none; color: #fff;">
        <div style="background-color: #3ab0ff; padding: 10px 20px; border-radius: 5px; margin-top: 20px; margin-bottom: 20px;">
          <p style="margin: 0;">Set Password</p>
        </div>
      </a>
    </div>
    <p>If you did not create an account, please ignore this email.</p>
    <p>Regards,</p>
    <p>Paradish</p>
    </div>
    </div>`;

export const RegisterHtmlTemplate = (
  name: string,
  restaurantName: string
) => `<div style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 1.5;">
    <div style="margin-bottom: 30px;">
        <p>Hi <strong>${name}</strong> owner of <strong>${restaurantName}</strong>,</p>
        <p>Your account has been created successfully.</p>
        <p>Please login to use Paradish to its full extent.</p>
        <p>Regards,</p>
        <p>Paradish</p>
        </div>
        </div>`;
