import { cn } from "@/lib/utils";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const DemoCredentialBase = ({
  title,
  email,
  password,
  onEmailClick,
  onPasswordClick,
}: {
  title: string;
  email: string;
  password: string;
  onEmailClick: (email: string) => void;
  onPasswordClick: (password: string) => void;
}) => {
  const [showCredentials, setShowCredentials] = useState(false);
  return (
    <div className="rounded-lg border border-dashed border-border bg-muted text-sm">
      <button
        type="button"
        onClick={() => setShowCredentials((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2 text-muted-foreground hover:text-foreground"
      >
        <span>{title} Demo Credential</span>
        <IoIosArrowDown
          className={`h-4 w-4 transition-transform duration-200 ${showCredentials ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200",
          showCredentials ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-2 border-t border-dashed border-border px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground text-xs w-14 shrink-0">
                Email
              </span>
              <code className="flex-1 font-mono text-xs text-gray-600 truncate">
                {email}
              </code>
              <button
                type="button"
                onClick={() => onEmailClick(email)}
                className="shrink-0 text-xs text-blue-500 hover:text-blue-700 hover:underline"
              >
                Use
              </button>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground text-xs w-14 shrink-0">
                Password
              </span>
              <code className="flex-1 font-mono text-xs text-gray-600">
                {password}
              </code>
              <button
                type="button"
                onClick={() => onPasswordClick(password)}
                className="shrink-0 text-xs text-blue-500 hover:text-blue-700 hover:underline"
              >
                Use
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoCredentialBase;
