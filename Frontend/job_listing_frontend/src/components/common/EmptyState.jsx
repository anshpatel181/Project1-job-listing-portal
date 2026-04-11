import { NavLink } from "react-router-dom";

const EmptyState = ({
  icon,
  title,
  description,
  actionText,
  actionLink,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
      
      <div className="flex justify-center mb-5 text-5xl text-slate-300">
        {icon}
      </div>

      <h2 className="text-lg font-semibold text-slate-800 mb-2">
        {title}
      </h2>

      <p className="text-slate-500 mb-6">
        {description}
      </p>

      {actionText && actionLink && (
        <NavLink
          to={actionLink}
          className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg
                     hover:bg-blue-700 transition"
        >
          {actionText}
        </NavLink>
      )}
    </div>
  );
};

export default EmptyState;