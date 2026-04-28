import DemoCredentialBase from "../DemoCredentialBase";

const DEMO_USER_EMAIL = "alice@job-tracker.com";
const DEMO_USER_PASSWORD = "P@ssword123";

const DemoCredentials = ({
  setEmail,
  setPassword,
}: {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <DemoCredentialBase
        title="Employer"
        email={DEMO_USER_EMAIL}
        password={DEMO_USER_PASSWORD}
        onEmailClick={setEmail}
        onPasswordClick={setPassword}
      />
    </div>
  );
};

export default DemoCredentials;
