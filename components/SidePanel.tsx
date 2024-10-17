"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  LinkIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";

export default function SidePanel() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus:outline-none"
      >
        Settings
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden text-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <form className="flex h-full flex-col divide-y divide-gray-200 bg-zinc-900 shadow-xl">
                  <div className="h-0 flex-1 overflow-y-auto">
                    <div className="bg-zinc-900 px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <DialogTitle className="text-base font-semibold leading-6 text-white">
                          Global Settings
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="relative rounded-md bg-gray-700 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-gray-300">
                          All global settings
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="divide-y divide-gray-200 px-4 sm:px-6">
                        <div className="space-y-6 pb-5 pt-6">
                          <div>
                            <label
                              htmlFor="project-name"
                              className="block text-sm font-medium leading-6 text-gray-700 dark:text-gray-300"
                            >
                              Project name
                            </label>
                            <div className="mt-2">
                              <input
                                id="project-name"
                                name="project-name"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-zinc-900 
                                dark:text-white shadow-sm ring-1 ring-inset 
                                ring-zinc-300 dark:ring-zinc-700 dark:bg-zinc-800  placeholder:text-zinc-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-inset 
                                focus:ring-zinc-600 dark:focus:ring-zinc-400 sm:text-sm sm:leading-6"
                                placeholder="Enter project name"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium leading-6 text-gray-700 dark:text-gray-300"
                            >
                              Description
                            </label>
                            <div className="mt-2">
                              <textarea
                                id="description"
                                name="description"
                                rows={4}
                                className="block w-full rounded-md border-0 py-1.5 text-zinc-900 dark:text-white shadow-sm ring-1 ring-inset 
                                ring-zinc-300 dark:ring-zinc-700 dark:bg-zinc-800 placeholder:text-zinc-400 dark:placeholder-zinc-500 
                                focus:ring-2 focus:ring-inset focus:ring-zinc-600 dark:focus:ring-zinc-400 sm:text-sm sm:leading-6"
                                placeholder="Enter description"
                              />
                            </div>
                          </div>
                          {/* <div>
                            <h3 className="text-sm font-medium leading-6 text-white">
                              Permission
                            </h3>
                            <div className="mt-2">
                              <div className="flex space-x-2">
                                {team.map((person) => (
                                  <a
                                    key={person.email}
                                    href={person.href}
                                    className="relative rounded-full hover:opacity-75"
                                  >
                                    <img
                                      alt={person.name}
                                      src={person.imageUrl}
                                      className="inline-block h-8 w-8 rounded-full"
                                    />
                                  </a>
                                ))}
                                <button
                                  type="button"
                                  className="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                  <span className="absolute -inset-2" />
                                  <span className="sr-only">
                                    Add team member
                                  </span>
                                  <PlusIcon
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                  />
                                </button>
                              </div>
                            </div>
                          </div> */}
                          <fieldset>
                            <legend className="text-sm font-medium leading-6 text-white">
                              Permission
                            </legend>
                            <div className="mt-2 space-y-4">
                              <div className="relative flex items-start">
                                <div className="absolute flex h-6 items-center">
                                  <input
                                    defaultChecked
                                    id="privacy-public"
                                    name="privacy"
                                    type="radio"
                                    aria-describedby="privacy-public-description"
                                    className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-600"
                                  />
                                </div>
                                <div className="pl-7 text-sm leading-6">
                                  <label
                                    htmlFor="privacy-public"
                                    className="font-medium text-white"
                                  >
                                    Public access
                                  </label>
                                  <p
                                    id="privacy-public-description"
                                    className="text-gray-500"
                                  >
                                    Everyone with the link will see this
                                    project.
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-6 items-center">
                                    <input
                                      id="privacy-private-to-project"
                                      name="privacy"
                                      type="radio"
                                      aria-describedby="privacy-private-to-project-description"
                                      className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-600"
                                    />
                                  </div>
                                  <div className="pl-7 text-sm leading-6">
                                    <label
                                      htmlFor="privacy-private-to-project"
                                      className="font-medium text-white"
                                    >
                                      Private to project members
                                    </label>
                                    <p
                                      id="privacy-private-to-project-description"
                                      className="text-gray-500"
                                    >
                                      Only members of this project would be able
                                      to access.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-6 items-center">
                                    <input
                                      id="privacy-private"
                                      name="privacy"
                                      type="radio"
                                      aria-describedby="privacy-private-to-project-description"
                                      className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-600"
                                    />
                                  </div>
                                  <div className="pl-7 text-sm leading-6">
                                    <label
                                      htmlFor="privacy-private"
                                      className="font-medium text-white"
                                    >
                                      Private to you
                                    </label>
                                    <p
                                      id="privacy-private-description"
                                      className="text-gray-500"
                                    >
                                      You are the only one able to access this
                                      project.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                        <div className="pb-6 pt-4">
                          <div className="flex text-sm">
                            <a
                              href="#"
                              className="group inline-flex items-center font-medium text-gray-600 hover:text-white"
                            >
                              <LinkIcon
                                aria-hidden="true"
                                className="h-5 w-5 text-gray-500 group-hover:text-white"
                              />
                              <span className="ml-2">Copy link</span>
                            </a>
                          </div>
                          <div className="mt-4 flex text-sm">
                            <a
                              href="#"
                              className="group inline-flex items-center text-gray-500 hover:text-white"
                            >
                              <QuestionMarkCircleIcon
                                aria-hidden="true"
                                className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              />
                              <span className="ml-2">
                                Learn more about sharing
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 justify-end px-4 py-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="ml-4 inline-flex justify-center rounded-md bg-red-300 px-3 py-2 text-sm text-black shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-4 inline-flex justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm text-black shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
