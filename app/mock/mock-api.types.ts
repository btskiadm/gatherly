import { StaticImageData } from "next/image";

export type DateISO = string;

export interface CategoryDto {
  label: string;
  value: string;
}

export interface CityDto {
  label: string;
  value: string;
}

export interface SearchCategoryDto extends CategoryDto {
  type: "category";
}

export interface SearchCityDto extends CityDto {
  type: "city";
}

export interface SearchGroupDto {
  type: "title";
  label: string;
  value: string;
}

export interface SearchUserDto {
  type: "username";
  id: string;
  username: string;
  thumbnails: {
    thumb: string;
  };
}

export interface AttributesDto {
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
}

export interface ThumbnailsDto {
  thumb: string;
}

export type GroupTileDto = {
  id: string;
  title: string;
  description: string;
  createdAt: DateISO;
  cities: CityDto[];
  categories: CategoryDto[];
  thumbnails: ThumbnailsDto;
  eventsLength: number;
  userLength: number;
} & AttributesDto;

export interface StackedGroupAttributesDto extends AttributesDto {
  city: CityDto;
  category: CategoryDto;
}

export interface StackedGroupTilesDto {
  attributes: StackedGroupAttributesDto;
  tiles: GroupTileDto[];
}

export interface SponsoredAttributeDto {
  id: string;
  value: boolean;
}

export interface VerifiedAttributeDto {
  id: string;
  value: boolean;
}

export interface RemoteAttributeDto {
  id: string;
  value: boolean;
}

export interface UserDetailsDto {
  description: string;
  city: CityDto;
}

export interface UserDto {
  id: string;
  username: string;
  thumbnails: ThumbnailsDto;
  staticImageData: StaticImageData;
  verifiedAt?: DateISO;
  userDetails: UserDetailsDto;
}

export interface GroupUserDto {
  isHost: boolean;
  isModerator: boolean;
  user: UserDto;
}

export interface EventUserDto {
  isHost: boolean;
  isModerator: boolean;
  user: UserDto;
}

export interface CommentDto {
  id: string;
  user: UserDto;
  content: string;
  createdAt: DateISO;
  rate: number;
}

export interface GroupDto {
  id: string;
  title: string;
  description: string;
  createdAt: DateISO;
  sponsored: SponsoredAttributeDto;
  verified: VerifiedAttributeDto;
  remote: RemoteAttributeDto;
  cities: CityDto[];
  categories: CategoryDto[];
  events: EventDto[];
  users: GroupUserDto[];
  comments: CommentDto[];
  thumbnails: ThumbnailsDto;
}

export interface EventDateDto {
  id: string;
  startAt: DateISO;
  endAt: DateISO;
}

export interface EventDto {
  id: string;
  title: string;
  description: string;
  createdAt: DateISO;
  users: EventUserDto[];
  canceled: boolean;
  date: EventDateDto;
  city: CityDto;
}

export interface EventStackDto {
  monthReference: DateISO;
  events: EventDto[];
}

export type GroupDetailsDto = GroupDto & {
  upcoming: EventStackDto[];
  pending: EventStackDto[];
  past: EventStackDto[];
  cancelled: EventStackDto[];
  upcomingLength: number;
  pendingLength: number;
  pastLength: number;
  cancelledLength: number;
};

export interface ShortGroupDto {
  id: string;
  title: string;
  users: number;
  verified: boolean;
  sponsored: boolean;
  thumbnails: ThumbnailsDto;
}