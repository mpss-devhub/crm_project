"use client";

import React, { JSX, useState } from "react";

interface PermissionNode {
  id: string;
  label: string;
  checked?: boolean;
  children?: PermissionNode[];
}

interface TreeNodeProps {
  node: PermissionNode;
  onChange: (updatedNode: PermissionNode) => void;
}

const updateChecked = (node: PermissionNode, checked: boolean): PermissionNode => {
  return {
    ...node,
    checked,
    children: node.children
      ? node.children.map((child) => updateChecked(child, checked))
      : [],
  };
};

function TreeNode({ node, onChange }: TreeNodeProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(true);

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLInputElement).type !== "checkbox") {
      setOpen(!open);
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedNode = updateChecked(node, e.target.checked);
    onChange(updatedNode);
  };

  return (
    <div className="ml-4">
      <div
        onClick={handleToggle}
        className="cursor-pointer flex items-center hover:bg-gray-100 px-2 py-1 rounded select-none"
      >
        {node.children && node.children.length > 0 && (
          <span className="cursor-pointer mr-2 text-lg font-bold w-4 inline-block text-center">
            {open ? "-" : "+"}
          </span>
        )}
        <input
          type="checkbox"
          checked={node.checked || false}
          onChange={handleCheck}
          onClick={(e) => e.stopPropagation()}
          className="mr-2 cursor-pointer"
        />
        <span>{node.label}</span>
      </div>

      {open && node.children && (
        <div className="pl-4 border-l border-gray-300 ml-2">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onChange={(updatedChild) => {
                const updatedChildren = node.children!.map((c) =>
                  c.id === updatedChild.id ? updatedChild : c
                );
                onChange({ ...node, children: updatedChildren });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TreeNode;
