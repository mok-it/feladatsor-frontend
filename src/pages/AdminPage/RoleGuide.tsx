import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ExpandMore, Close, Info } from "@mui/icons-material";
import {
  MdAdminPanelSettings,
  MdPersonAdd,
  MdSearch,
  MdCheckCircle,
  MdContentCopy,
  MdDone,
  MdDescription,
  MdRateReview,
} from "react-icons/md";
import { Role } from "@/generated/graphql";

interface RoleInfo {
  role: Role;
  displayName: string;
  description: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  permissions: string[];
  pages: string[];
  color: "primary" | "secondary" | "success" | "warning" | "error" | "info";
}

const roleInformation: RoleInfo[] = [
  {
    role: "ADMIN",
    displayName: "Adminisztrátor",
    description:
      "Teljes hozzáférés az alkalmazáshoz. Megkerüli az összes jogosultság-ellenőrzést.",
    icon: MdAdminPanelSettings,
    color: "error",
    permissions: [
      "Összes endpoint és művelet elérhető",
      "Felhasználói jogosultságok módosítása",
      "Excel exportok kezelése",
      "Régi Excel fájlok betöltése",
      "Minden felhasználó profiljának szerkesztése",
    ],
    pages: ["Admin panel", "Összes többi oldal hozzáférhető"],
  },
  {
    role: "USER",
    displayName: "Felhasználó",
    description:
      "Alapvető felhasználói jogosultságok. Feladatok beküldése és saját feladatok megtekintése.",
    icon: MdPersonAdd,
    color: "primary",
    permissions: [
      "Új feladatok létrehozása",
      "Feladatok szerkesztése (státusz korlátozásokkal)",
      "Feladatokhoz kommentek írása, szerkesztése, törlése",
      "Összes felhasználó listázása",
      "Saját profil szerkesztése",
    ],
    pages: [
      "Feladat beküldés oldal",
      "Feladatok keresése (azzal a korlátozással hogy csak a saját feladataira tud keresni)",
      "Profil oldal",
    ],
  },
  {
    role: "LIST_EXERCISES",
    displayName: "Feladatok listázása",
    description: "Lehetővé teszi az összes feladat megtekintését és keresését.",
    icon: MdSearch,
    color: "info",
    permissions: [
      "Feladatok számának lekérdezése",
      "Feladatok keresése (összes feladat között)",
    ],
    pages: ["Feladat keresés/lista oldal"],
  },
  {
    role: "CHECK_EXERCISE",
    displayName: "Feladat ellenőrzés",
    description: "Feladatok ellenőrzése az Ellenőrzöm gomb segítségével.",
    icon: MdCheckCircle,
    color: "warning",
    permissions: ["Feladat ellenőrzések létrehozása"],
    pages: ["Feladat ellenőrzés oldal"],
  },
  {
    role: "CLONE_EXERCISE",
    displayName: "Feladat klónozás",
    description: "Meglévő feladatok másolása és újrafelhasználása.",
    icon: MdContentCopy,
    color: "secondary",
    permissions: [
      "Feladatok klónozása új feladatként",
      "Közreműködők megadása klónozáskor",
    ],
    pages: ["Feladat szerkesztés oldalon belül érhető el"],
  },
  {
    role: "FINALIZE_EXERCISE",
    displayName: "Feladat véglegesítés",
    description: "Feladatok státuszának végleges módosítása (Kész, Törlendő).",
    icon: MdDone,
    color: "success",
    permissions: [
      "Feladatok státuszának Kész-re állítása",
      "Feladatok státuszának Törlendő-re állítása",
    ],
    pages: ["Feladat szerkesztés oldalon belül érhető el"],
  },
  {
    role: "EXERCISE_SHEET",
    displayName: "Feladatsor kezelés",
    description: "Feladatsorok létrehozása, szerkesztése és kezelése.",
    icon: MdDescription,
    color: "info",
    permissions: [
      "Feladatsorok listázása",
      "Feladatsor részletek megtekintése",
      "Új feladatsorok létrehozása",
      "Meglévő feladatsorok szerkesztése",
      "Feladatsor összeállítás funkciók",
    ],
    pages: ["Feladatsor oldal", "Feladatsor összeállítás"],
  },
  {
    role: "PROOFREAD_EXERCISE_SHEET",
    displayName: "Feladatsor lektorálás",
    description: "Feladatsorok lektorálása és kommentezése.",
    icon: MdRateReview,
    color: "warning",
    permissions: [
      "Feladatsorok törlése",
      "Feladatsorokhoz kommentek hozzáadása",
    ],
    pages: ["Funkcionalitás feladatsor oldalakon érhető el"],
  },
];

const RoleGuideContent = () => (
  <Box>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      Az alábbi táblázat részletesen bemutatja az egyes szerepkörök
      funkcionalitását és hozzáférési jogait.
    </Typography>

    {roleInformation.map((roleInfo) => {
      const IconComponent = roleInfo.icon;
      return (
        <Accordion key={roleInfo.role} sx={{ mb: 0.5 }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              "& .MuiAccordionSummary-content": {
                pointerEvents: "none",
              },
              "& .MuiAccordionSummary-expandIconWrapper": {
                pointerEvents: "auto",
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5} width="100%">
              <IconComponent style={{ fontSize: 20 }} />
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ flexGrow: 1, fontWeight: 600 }}
              >
                {roleInfo.displayName}
              </Typography>
              <Chip
                label={roleInfo.role}
                color={roleInfo.color}
                size="small"
                variant="outlined"
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 1, pb: 1 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1.5 }}>
                {roleInfo.description}
              </Typography>

              <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
                Engedélyezett műveletek:
              </Typography>
              <List dense sx={{ py: 0 }}>
                {roleInfo.permissions.map((permission, index) => (
                  <ListItem key={index} sx={{ py: 0, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0 }}
                      primary={
                        <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                          {permission}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Typography
                variant="subtitle2"
                sx={{ mb: 0.5, mt: 1, fontWeight: 600 }}
              >
                Elérhető oldalak:
              </Typography>
              <List dense sx={{ py: 0 }}>
                {roleInfo.pages.map((page, index) => (
                  <ListItem key={index} sx={{ py: 0, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          bgcolor: "secondary.main",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ m: 0 }}
                      primary={
                        <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                          {page}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </AccordionDetails>
        </Accordion>
      );
    })}

    <Box
      sx={{
        mt: 2,
        p: 1.5,
        bgcolor: "background.paper",
        borderRadius: 1,
        border: 1,
        borderColor: "divider",
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
        Fontos tudnivalók:
      </Typography>
      <List dense sx={{ py: 0 }}>
        <ListItem sx={{ m: 0, px: 0 }}>
          <ListItemIcon sx={{ minWidth: 24 }}>
            <Box
              sx={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                bgcolor: "warning.main",
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0 }}
            primary={
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                A felhasználónak ki kell lépni és újra be kell jelentkeznie,
                hogy jogosultásg módosítások frissüljenek számára.
              </Typography>
            }
          />
        </ListItem>
        <ListItem sx={{ m: 0, px: 0 }}>
          <ListItemIcon sx={{ minWidth: 24 }}>
            <Box
              sx={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                bgcolor: "warning.main",
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0 }}
            primary={
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                Az ADMIN szerepkör megkerüli az összes jogosultság-ellenőrzést
              </Typography>
            }
          />
        </ListItem>
        <ListItem sx={{ m: 0, px: 0 }}>
          <ListItemIcon sx={{ minWidth: 24 }}>
            <Box
              sx={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                bgcolor: "warning.main",
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0 }}
            primary={
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                Egy felhasználónak több szerepköre is lehet egyszerre
              </Typography>
            }
          />
        </ListItem>
        <ListItem sx={{ m: 0, px: 0 }}>
          <ListItemIcon sx={{ minWidth: 24 }}>
            <Box
              sx={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                bgcolor: "warning.main",
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0 }}
            primary={
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                A saját jogosultságaidat nem tudod módosítani
              </Typography>
            }
          />
        </ListItem>
        <ListItem sx={{ m: 0, px: 0 }}>
          <ListItemIcon sx={{ minWidth: 24 }}>
            <Box
              sx={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                bgcolor: "warning.main",
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ m: 0 }}
            primary={
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                Ha nincs megfelelő jogosultságod egy oldalhoz, nem jelenik meg a
                navigációban
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  </Box>
);

export const RoleGuide = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<Info />}
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Jogosultságok részletes leírása
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              Jogosultságok részletes leírása
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <RoleGuideContent />
        </DialogContent>
      </Dialog>
    </>
  );
};
