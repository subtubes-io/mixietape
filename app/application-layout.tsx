import React from 'react';
import { ChevronUpIcon } from '@heroicons/react/16/solid'; // ChevronDownIcon,
import { Avatar } from '@/components/catalyst/avatar';
import { Dropdown, DropdownButton } from '@/components/catalyst/dropdown';
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from '@/components/catalyst/navbar';
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSpacer,
  SidebarSection,
} from '@/components/catalyst/sidebar';
import { SidebarLayout } from '@/components/catalyst/sidebar-layout';

function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/users/edgar.jpeg" square />
              </DropdownButton>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                {/* <Avatar src="/teams/catalyst.svg" /> */}

                <SidebarLabel>MixieTape</SidebarLabel>
                {/* <ChevronDownIcon /> */}
              </DropdownButton>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem to="/">Home</SidebarItem>
              <SidebarItem to="/projects">Projects</SidebarItem>
            </SidebarSection>
            <SidebarSpacer />
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar
                    src="/assets/icon.png"
                    className="size-10"
                    square
                    alt=""
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      Edgar
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      edgar@mixietape.com
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}

export default ApplicationLayout;
