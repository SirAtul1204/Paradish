export const PasswordHtmlTemplate = (
  password: string
) => `<div style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 1.5;">
  <div style="margin-bottom: 30px;">
    <p>Hi {{name}},</p>
    <p>Your account has been created successfully.</p>
    <p>Your new password is: <strong>${password}</strong></p>
    <p>Please login and change your password.</p>
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
