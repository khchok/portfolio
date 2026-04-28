import DemoCredentialBase from "../DemoCredentialBase";

const DEMO_EMPLOYER_EMAIL = "employer@jobmarket.dev";
const DEMO_EMPLOYER_PASSWORD = "P@ssword123";
const DEMO_CANDIDATE_EMAIL = "candidate@jobmarket.dev";
const DEMO_CANDIDATE_PASSWORD = "P@ssword123";
const DEMO_ADMIN_EMAIL = "admin@jobmarket.dev";
const DEMO_ADMIN_PASSWORD = "P@ssword123";

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
        email={DEMO_EMPLOYER_EMAIL}
        password={DEMO_EMPLOYER_PASSWORD}
        onEmailClick={setEmail}
        onPasswordClick={setPassword}
      />
      <DemoCredentialBase
        title="Candidate"
        email={DEMO_CANDIDATE_EMAIL}
        password={DEMO_CANDIDATE_PASSWORD}
        onEmailClick={setEmail}
        onPasswordClick={setPassword}
      />

      <DemoCredentialBase
        title="Admin"
        email={DEMO_ADMIN_EMAIL}
        password={DEMO_ADMIN_PASSWORD}
        onEmailClick={setEmail}
        onPasswordClick={setPassword}
      />
    </div>
  );
};

export default DemoCredentials;
