"use client";

import { Textarea } from "@/app/common/components/Textarea";
import {
  CreateGroupInput,
  ZodFlattenIssue,
  createGroupSchema,
  flattenIssues,
  maxGroupCategories,
  maxGroupDescription,
  maxGroupName,
} from "@/app/common/utils/zod";
import {
  Autocomplete,
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import React, { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { CategorySearch, CitySearch, allCategories, allCities } from "../../../../groups/mock";

const loading = false;

export interface CreateGroupData {
  success: boolean;
  data?: CreateGroupInput;
}

export interface CreateGroupRef {
  reset: () => void;
  save: () => CreateGroupData;
}

interface Props {
  name?: string;
  description?: string;
  city?: CitySearch;
  categories?: CategorySearch[];
}

export const CreateGroup = forwardRef<CreateGroupRef, Props>(
  ({ name: _name = "", description: _description = "", city: _city = null, categories: _categories = [] }, ref) => {
    const [name, setName] = useState(_name);
    const [description, setDescription] = useState(_description);
    const [city, setCity] = useState<CitySearch | null>(_city);
    const [categories, setCategories] = useState<CategorySearch[]>(_categories);
    const [errors, setErrors] = useState<ZodFlattenIssue>({});

    const handleReset = useCallback(() => {
      setName("");
      setDescription("");
      setCity(null);
      setCategories([]);
    }, []);

    const handleSave = useCallback((): CreateGroupData => {
      const { data, success, error } = createGroupSchema.safeParse({
        name,
        description,
        city: city?.value,
        categories: categories.map(({ value }) => value),
      });

      if (error) {
        setErrors(flattenIssues(error?.issues));
      }

      return {
        success,
        data,
      };
    }, [name, description, city, categories]);

    useImperativeHandle(ref, () => ({
      save: handleSave,
      reset: handleReset,
    }));

    const handleCategories = useCallback((e: unknown, categories: CategorySearch[]) => {
      setCategories(categories);
    }, []);

    const handleCity = useCallback((e: unknown, value: CitySearch | null) => {
      setCity(value);
    }, []);

    const handleName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    }, []);

    const handleDescription = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    }, []);

    const nameError = errors["name"];
    const descriptionError = errors["description"];
    const categoriesError = errors["categories"];
    const cityError = errors["city"];

    return (
      <Stack gap={2} width="100%">
        <FormControl error={!!nameError}>
          <FormLabel required>Nazwa</FormLabel>
          <TextField placeholder="Nazwa grupy" size="small" value={name} onChange={handleName} />
          <FormHelperText>
            {!nameError ? (
              <>
                Dostępne znaki: {name.length}/{maxGroupName}
              </>
            ) : (
              nameError.message
            )}
          </FormHelperText>
        </FormControl>
        <FormControl error={!!categoriesError}>
          <FormLabel required>Kategorie</FormLabel>
          <Autocomplete<CategorySearch, true>
            multiple
            value={categories}
            defaultValue={categories}
            onChange={handleCategories}
            options={allCategories}
            sx={{
              ".MuiAutocomplete-tag": {
                my: 0, // fix problem with chip inside autocomplete
              },
              ".MuiChip-label": {
                my: 0, // fix problem with chip inside autocomplete
              },
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    placeholder: "Kategorie",
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  },
                }}
              />
            )}
            renderTags={(value, getTagProps) => {
              return (
                <Stack direction="row" maxWidth="80%" width="min-content">
                  {value.slice(0, 1).map((option, index: number) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return (
                      <Chip
                        key={option.value}
                        component="div"
                        variant="outlined"
                        size="small"
                        label={option.label}
                        {...tagProps}
                      />
                    );
                  })}

                  {value?.length > 1 && (
                    <Chip
                      {...getTagProps({ index: 1 })}
                      key={getTagProps({ index: 1 }).key}
                      component="div"
                      variant="outlined"
                      size="small"
                      label={"+" + (value.length - 1)}
                      onDelete={undefined}
                    />
                  )}
                </Stack>
              );
            }}
          />
          <FormHelperText>
            {!categoriesError ? (
              <>
                Dostępne kategorie: {categories.length}/{maxGroupCategories}
              </>
            ) : (
              categoriesError.message
            )}
          </FormHelperText>
        </FormControl>
        <FormControl error={!!descriptionError}>
          <FormLabel required>Description</FormLabel>
          <Textarea placeholder="Opis" minRows={6} value={description} onChange={handleDescription} />
          <FormHelperText>
            {!descriptionError ? (
              <>
                Dostępne znaki: {description.length}/{maxGroupDescription}
              </>
            ) : (
              descriptionError.message
            )}
          </FormHelperText>
        </FormControl>
        <FormControl error={!!cityError}>
          <FormLabel>Miasto</FormLabel>
          <Autocomplete<CitySearch>
            value={city}
            defaultValue={city}
            onChange={handleCity}
            options={allCities}
            getOptionLabel={({ label }) => label}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    placeholder: "Miasto",
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  },
                }}
              />
            )}
          />
        </FormControl>
      </Stack>
    );
  }
);
