import { Card, Typography, List, ListItem, ListItemPrefix,
         ListItemSuffix, Chip, Accordion, AccordionHeader, AccordionBody,} from "@material-tailwind/react";
import { PresentationChartBarIcon, UserCircleIcon,
         Cog6ToothIcon, InboxIcon, PowerIcon, } from "@heroicons/react/24/solid";

import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { MdTour } from "react-icons/md";

import React, { useContext } from "react";
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import { UserContext } from "@/UserContext";

export function MultiLevelSidebar() {
  const [open, setOpen] = React.useState(0);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/'); // Redirect to the index after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Card className="h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
            {!!user && (<div>{user.name}</div>)}
        </Typography>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="bg-transparent border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-6 w-6" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="bg-transparent border-b-0 p-3">
              <ListItemPrefix>
                <MdTour className="h-6 w-6" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Tours & Packages
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Bookings
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Packages
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
