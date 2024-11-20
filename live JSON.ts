import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import { FormSchema } from './types';

const JsonEditor: React.FC<{ schema: FormSchema; onSchemaChange: (updatedSchema: FormSchema) => void }> = ({ schema, onSchemaChange }) => {
  const handleChange = (e: any) => {
    try {
      const newSchema = JSON.parse(e.target.value);
      onSchemaChange(newSchema);
    } catch (err) {
      console.error("Invalid JSON", err);
    }
  };

  return (
    <div className="h-full w-1/2 p-4 bg-gray-100">
      <textarea
        className="w-full h-full p-2 border border-gray-300"
        value={JSON.stringify(schema, null, 2)}
        onChange={handleChange}
      />
    </div>
  );
};
