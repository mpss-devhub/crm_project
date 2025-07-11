"use client";

import React, { useState, useEffect } from "react";

interface PermissionNode {
  id: string;
  label: string;
  checked?: boolean;
  children?: PermissionNode[];
}

export function PermissionTree() {
  const [treeData, setTreeData] = useState<PermissionNode[]>([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch("/api/permissions");
        if (!response.ok) throw new Error("Failed to fetch permissions");
        const data = await response.json();
        const treeStructure = buildPermissionTree(data);
        setTreeData(treeStructure);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    fetchPermissions();
  }, []);

  const buildPermissionTree = (permissions: any[]): PermissionNode[] => {
    const permissionMap = new Map<string, PermissionNode>();

    permissions.forEach((permission) => {
      permissionMap.set(permission.id, {
        id: permission.id,
        label: permission.name,
        checked: false,
        children: [],
      });
    });

    const tree: PermissionNode[] = [];

    permissions.forEach((permission) => {
      const node = permissionMap.get(permission.id);
      if (permission.parentId) {
        const parent = permissionMap.get(permission.parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(node!);
        }
      } else {
        tree.push(node!);
      }
    });

    return tree;
  };

  // Updates node and all children with the checked state
  const updateNodeAndChildren = (
    node: PermissionNode,
    checked: boolean
  ): PermissionNode => {
    console.log('node', node)
    return {
      ...node,
      checked,
      children: node.children?.map((child) =>
        updateNodeAndChildren(child, checked)
      ),
    };
  };

  const updateParents = (nodes: PermissionNode[]): PermissionNode[] => {
    return nodes.map((node) => {
      if (node.children && node.children.length > 0) {
        const updatedChildren = updateParents(node.children);
        const allChecked = updatedChildren.every((child) => child.checked === true);
        const someChecked = updatedChildren.some(
          (child) => child.checked === true || child.checked === undefined
        );
        return {
          ...node,
          checked: allChecked ? true : someChecked ? undefined : false,
          children: updatedChildren,
        };
      }
      return node;
    });
  };

  const handleNodeChange = (updatedNode: PermissionNode) => {
    const updateTree = (nodes: PermissionNode[]): PermissionNode[] => {
      return nodes.map((node) => {
        if (node.id === updatedNode.id) {
          return updateNodeAndChildren(updatedNode, updatedNode.checked ?? false);
        }
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children),
          };
        }
        return node;
      });
    };
    setTreeData((prev) => updateParents(updateTree(prev)));
  };

  return (
    <div className="p-4">
      {treeData.map((node) => (
        <TreeNode key={node.id} node={node} onChange={handleNodeChange} />
      ))}
    </div>
  );
}

function TreeNode({
  node,
  onChange,
}: {
  node: PermissionNode;
  onChange: (node: PermissionNode) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.getAttribute("type") !== "checkbox") {
      setIsOpen(!isOpen);
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...node,
      checked: e.target.checked,
    });
  };

  const handleChildChange = (updatedChild: PermissionNode) => {
    const updatedChildren = node.children?.map((child) =>
      child.id === updatedChild.id ? updatedChild : child
    );
    onChange({
      ...node,
      children: updatedChildren,
    });
  };

  return (
    <div className="ml-4">
      <div
        onClick={handleToggle}
        className="cursor-pointer flex items-center hover:bg-gray-100 px-2 py-1 rounded select-none"
        role="treeitem"
        aria-expanded={isOpen}
      >
        {hasChildren && (
          <span className="mr-2 text-lg font-bold w-4 inline-block text-center">
            {isOpen ? "−" : "+"}
          </span>
        )}
        <input
          type="checkbox"
          checked={node.checked === true}
          ref={(el) => {
            if (el) el.indeterminate = node.checked === undefined;
          }}
          onChange={handleCheck}
          onClick={(e) => e.stopPropagation()}
          className="mr-2 cursor-pointer"
          aria-label={`Select ${node.label}`}
        />
        <span>{node.label}</span>
      </div>

      {isOpen && hasChildren && (
        <div className="pl-4 border-l border-gray-300 ml-2" role="group">
          {node.children?.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onChange={handleChildChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
