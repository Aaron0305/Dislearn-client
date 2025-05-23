    "use client";

    import React from "react";

    export interface SelectItemProps {
    value: string;
    children: React.ReactNode;
    }

    export const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => {
    return <option value={value}>{children}</option>;
    };

    export interface SelectProps {
    children: React.ReactNode;
    value: string;
    onValueChange: (value: string) => void;
    className?: string;
    }

    export const Select: React.FC<SelectProps> = ({
    children,
    value,
    onValueChange,
    className = "",
    }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onValueChange(e.target.value);
    };

    return (
        <div className={className}>
        <select
            value={value}
            onChange={handleChange}
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
            {children}
        </select>
        </div>
    );
    };

    export interface SelectTriggerProps {
    children: React.ReactNode;
    className?: string;
    }

    export const SelectTrigger: React.FC<SelectTriggerProps> = ({
    children,
    className = "",
    }) => <div className={className}>{children}</div>;

    export const SelectValue: React.FC = () => null;

    export interface SelectContentProps {
    children: React.ReactNode;
    }

    export const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
    return <>{children}</>;
    };