"use client";

import Button from "components/Backbtn";
import CreateButton from "@/components/createBtn";
import InputBox from "@/components/InputBox";
import { Label } from "@/components/label";
import Layout from "@/components/Layout";
import PasswordBox from "@/components/PasswordBox";
import SelectBox from "@/components/selectBox";
import React, { useState } from "react";
import TreeNode from "@/components/TreeNode";
import { PermissionTree } from "@/types/permission";

const UserGroupCreateForm = ({
  permissions,
}: {
  permissions: PermissionTree[];
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [formErrors, setFormErrors] = useState({ systemType: "" });

  const [treeData, setTreeData] = useState<PermissionTree[]>(permissions);

  const systemType = [
    { value: "", label: "Select system type", disabled: true },
    { value: "superAdmin", label: "Super Admin" },
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  
  const updateNode = (
    nodes: PermissionTree[],
    updatedNode: PermissionTree
  ): PermissionTree[] => {
    return nodes.map((node) => {
      if (node.id === updatedNode.id) {
        return updatedNode;
      }
      if (node.children) {
        return {
          ...node,
          children: updateNode(node.children, updatedNode),
        };
      }
      return node;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {};

  return (
    <Layout>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Create User</h1>
        <Button href="/user" className="mb-4" />
      </div>
      <div className="max-w-4xl mx-auto md:mx-auto rounded-lg shadow-md p-6 mt-3">
        <div className="max-w-lg space-y-4 mx-auto">
          <form>
            <div className="flex items-center gap-4">
              <div className="w-28">
                <Label htmlFor="name" required={true}>
                  Name
                </Label>
              </div>
              <div className="flex-1">
                <InputBox
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-28">
                <Label htmlFor="inputField" required={true}>
                  System Type
                </Label>
              </div>
              <div className="flex-1">
                <SelectBox
                  id="systemType"
                  value={selectedGroup}
                  onChange={(e) => {
                    setSelectedGroup(e.target.value);
                    setFormErrors({ ...formErrors, systemType: "" });
                  }}
                  required
                  options={systemType}
                  errorMessage={formErrors.systemType}
                  className="text-[#3E4354]"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-28">
                <Label htmlFor="inputField" required={false}>
                  Description
                </Label>
              </div>
              <div className="flex-1">
                <InputBox
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-28">
                <Label htmlFor="inputField" required={true}>
                  Password
                </Label>
              </div>
              <div className="flex-1">
                <PasswordBox
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-28">
                <Label htmlFor="inputField" required={true}>
                  Permission
                </Label>
              </div>
              <div className="flex-1">
                {treeData.map((node) => (
                  <TreeNode
                    key={node.id}
                    node={node}
                    onChange={(updatedNode) => {
                      const updatedTreeData = updateNode(treeData, updatedNode);
                      setTreeData(updatedTreeData);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CreateButton
                id="submit-btn"
                value="Create Account"
                className="ml-auto custom-class-if-needed"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserGroupCreateForm;
