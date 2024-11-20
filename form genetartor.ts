import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormField, FormSchema } from './types';

const DynamicForm: React.FC<{ schema: FormSchema }> = ({ schema }) => {
  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    alert("Form submitted successfully!");
  };

  return (
    <div className="w-1/2 p-4 bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-xl font-bold">{schema.formTitle}</h2>
        <p>{schema.formDescription}</p>
        {schema.fields.map((field: FormField) => {
          switch (field.type) {
            case "text":
            case "email":
              return (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block">{field.label}</label>
                  <Controller
                    control={control}
                    name={field.id}
                    render={({ field }) => (
                      <input
                        {...field}
                        type={field.type}
                        id={field.id}
                        className="mt-1 p-2 w-full border"
                        placeholder={field.placeholder}
                      />
                    )}
                    rules={{ required: field.required }}
                  />
                  {errors[field.id] && <p className="text-red-500">{`${field.label} is required`}</p>}
                </div>
              );
            case "select":
              return (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block">{field.label}</label>
                  <Controller
                    control={control}
                    name={field.id}
                    render={({ field }) => (
                      <select {...field} id={field.id} className="mt-1 p-2 w-full border">
                        {field.options?.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    )}
                    rules={{ required: field.required }}
                  />
                  {errors[field.id] && <p className="text-red-500">{`${field.label} is required`}</p>}
                </div>
              );
            case "radio":
              return (
                <div key={field.id}>
                  <label className="block">{field.label}</label>
                  <Controller
                    control={control}
                    name={field.id}
                    render={({ field }) => (
                      <div className="flex space-x-4">
                        {field.options?.map(option => (
                          <div key={option.value}>
                            <input
                              {...field}
                              type="radio"
                              value={option.value}
                              id={option.value}
                              className="mr-2"
                            />
                            <label htmlFor={option.value}>{option.label}</label>
                          </div>
                        ))}
                      </div>
                    )}
                    rules={{ required: field.required }}
                  />
                  {errors[field.id] && <p className="text-red-500">{`${field.label} is required`}</p>}
                </div>
              );
            case "textarea":
              return (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block">{field.label}</label>
                  <Controller
                    control={control}
                    name={field.id}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        id={field.id}
                        placeholder={field.placeholder}
                        className="mt-1 p-2 w-full border"
                      />
                    )}
                    rules={{ required: field.required }}
                  />
                  {errors[field.id] && <p className="text-red-500">{`${field.label} is required`}</p>}
                </div>
              );
            default:
              return null;
          }
        })}
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </div>
  );
};
