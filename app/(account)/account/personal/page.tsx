"use client";

import { TruncatedFormHelperText } from "@/app/common/components/TruncatedFormHelperText";
import { AddOutlined } from "@mui/icons-material";
import {
  Button,
  Chip,
  FormControl,
  FormLabel,
  Grid2,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";

const LOOKING_FOR = {
  practiceHobbies: "Practice Hobbies",
  socialize: "Socialize",
  makeFriends: "Make Friends",
  professionallyNetwork: "Professionally network",
};

const LIFE_STAGES = {
  recentGraduate: "Recent Graduate",
  student: "Student",
  newInTown: "New In Town",
  newEmptyNester: "New Empty Nester",
  newlyRetired: "Newly Retired",
  newParent: "New Parent",
  career: "Career",
};

const MONTHS = {
  january: "January",
  february: "February",
  march: "March",
  april: "April",
  may: "May",
  june: "June",
  july: "July",
  august: "August",
  september: "September",
  october: "October",
  november: "November",
  december: "December",
};

const MONTHS_WITH_EMPTY = {
  "": "",
  ...MONTHS,
};

type LookingForKey = keyof typeof LOOKING_FOR;
type LifeStageKey = keyof typeof LIFE_STAGES;
type MonthKey = keyof typeof MONTHS_WITH_EMPTY;

export default function Page() {
  const [month, setMonth] = useState<MonthKey>("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [lifeStages, setLifeStages] = useState<string[]>([]);

  const handleMonth = useCallback((e: SelectChangeEvent) => {
    setMonth(e.target.value as MonthKey);
  }, []);

  const handleDay = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDay(e.target.value);
  }, []);

  const handleYear = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  }, []);

  const handleGender = useCallback((e: SelectChangeEvent) => {
    setGender(e.target.value);
  }, []);

  const hasLookingFor = useCallback(
    (key: LookingForKey) => {
      return lookingFor.some((attr) => attr === key);
    },
    [lookingFor]
  );

  const toogleLooginFor = useCallback((key: LookingForKey) => {
    setLookingFor((prevAttrs) => {
      const contain = prevAttrs.some((attr) => attr === key);

      if (contain) {
        return prevAttrs.filter((attr) => attr !== key);
      }

      return [...prevAttrs, key];
    });
  }, []);

  const hasLifeStage = useCallback(
    (key: LifeStageKey) => {
      return lifeStages.some((attr) => attr === key);
    },
    [lifeStages]
  );

  const toogleLifeStages = useCallback((key: LifeStageKey) => {
    setLifeStages((prevAttrs) => {
      const contain = prevAttrs.some((attr) => attr === key);

      if (contain) {
        return prevAttrs.filter((attr) => attr !== key);
      }

      return [...prevAttrs, key];
    });
  }, []);

  return (
    <Paper>
      <Stack p={{ xs: 2, sm: 3 }} gap={{ xs: 2, sm: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Personal information
        </Typography>
        <FormControl>
          <FormLabel>Birthdate</FormLabel>
          <Grid2 container spacing={1}>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Select
                displayEmpty
                fullWidth
                value={month}
                notched={false}
                size="small"
                label="Birthdate"
                onChange={handleMonth}
                renderValue={(value: MonthKey) =>
                  value ? (
                    MONTHS_WITH_EMPTY[value]
                  ) : (
                    <Typography
                      sx={{
                        opacity: 0.4,
                      }}
                    >
                      Month
                    </Typography>
                  )
                }
              >
                <MenuItem value="">
                  <Typography
                    sx={{
                      opacity: 0.4,
                    }}
                  >
                    &#8202;
                  </Typography>
                </MenuItem>

                {Object.entries(MONTHS).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              <TruncatedFormHelperText>Month MM fromat</TruncatedFormHelperText>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth placeholder="Day" size="small" value={day} onChange={handleDay} />
              <TruncatedFormHelperText>Day DD format</TruncatedFormHelperText>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth placeholder="Year" size="small" value={year} onChange={handleYear} />
              <TruncatedFormHelperText>Year YYYY format</TruncatedFormHelperText>
            </Grid2>
          </Grid2>
        </FormControl>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select
            displayEmpty
            value={gender}
            notched={false}
            size="small"
            placeholder="Gender"
            label="Gender"
            onChange={handleGender}
            renderValue={(value: string) =>
              value ? (
                value
              ) : (
                <Typography
                  sx={{
                    opacity: 0.4,
                  }}
                >
                  Gender
                </Typography>
              )
            }
          >
            <MenuItem value="">
              <Typography
                sx={{
                  opacity: 0.4,
                }}
              >
                &#8202;
              </Typography>
            </MenuItem>

            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="non-binary">Non-Binary</MenuItem>
            <MenuItem value="not-listed">Not listed</MenuItem>
          </Select>
          <TruncatedFormHelperText>Your gender is not visible to others</TruncatedFormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>What are you looking for?</FormLabel>
          <Stack direction="row" gap={1} flexWrap="wrap">
            <Chip
              variant="outlined"
              color={hasLookingFor("practiceHobbies") ? "primary" : "default"}
              label={LOOKING_FOR["practiceHobbies"]}
              icon={<AddOutlined fontSize="small" />}
              onClick={() => toogleLooginFor("practiceHobbies")}
            />

            <Chip
              variant="outlined"
              color={hasLookingFor("socialize") ? "primary" : "default"}
              label={LOOKING_FOR["socialize"]}
              icon={<AddOutlined fontSize="small" />}
              onClick={() => toogleLooginFor("socialize")}
            />
            <Chip
              variant="outlined"
              color={hasLookingFor("makeFriends") ? "primary" : "default"}
              label={LOOKING_FOR["makeFriends"]}
              icon={<AddOutlined fontSize="small" />}
              onClick={() => toogleLooginFor("makeFriends")}
            />
            <Chip
              variant="outlined"
              color={hasLookingFor("professionallyNetwork") ? "primary" : "default"}
              label={LOOKING_FOR["professionallyNetwork"]}
              icon={<AddOutlined fontSize="small" />}
              onClick={() => toogleLooginFor("professionallyNetwork")}
            />
          </Stack>
          <TruncatedFormHelperText>Your gender is not visible to others</TruncatedFormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Life stages</FormLabel>
          <Stack direction="row" gap={1} flexWrap="wrap">
            {Object.entries(LIFE_STAGES).map(([k, v]) => {
              return (
                <Chip
                  key={k}
                  variant="outlined"
                  color={hasLifeStage(k as LifeStageKey) ? "primary" : "default"}
                  label={v}
                  icon={<AddOutlined fontSize="small" />}
                  onClick={() => toogleLifeStages(k as LifeStageKey)}
                />
              );
            })}
          </Stack>
          <TruncatedFormHelperText>Your life stage is not visible to others</TruncatedFormHelperText>
        </FormControl>
        <Stack direction="row" justifyContent="flex-end">
          <Button variant="contained">Save</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}