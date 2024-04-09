import {
  Box,
  Button,
  Input,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { useActiveSearch, useIssuesData, useSearchUrl } from "../../stores";
import { onGetIssues } from "../../service";
import { useCustomToast } from "../../utils/toast";
import { checkIsValidUrl, convertFirstLetterToUpperCase } from "../../utils";
import { IssueType } from "../../types";

const initialGlobalData = {
  repositoryName: "",
  repositoryUrl: "",
  profileName: "",
  profileUrl: "",
};

export const Header = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [previousFetchUrl, setPreviousFetchUrl] = useState<string>("");
  const [globalData, setGlobalData] = useState(initialGlobalData);

  const { isActiveSearch, setActiveSearch } = useActiveSearch();
  const { setIssuesData } = useIssuesData();
  const { showToast } = useCustomToast();
  const { setSearchUrl } = useSearchUrl();

  const handleChange = (value: string) => {
    setSearchValue(value);
  };

  const resetData = () => {
    setSearchValue("");
    setActiveSearch(false);
    setGlobalData(initialGlobalData);
  };

  const fetchIssues = (urls: string[]) => {
    Promise.all(
      urls.map((url) =>
        onGetIssues(`${process.env.REACT_APP_GITHUB_ENDPOINT + url}`)
      )
    )
      .then((data) => onReceivedData(data.flat()))
      .catch((err) => showToast(err.message, "error"));
  };

  const onFetch = () => {
    if (isActiveSearch && searchValue !== previousFetchUrl) {
      resetData();
    }
    if (checkIsValidUrl(searchValue)) {
      showToast("Please enter the valid URL from GitHub Repository", "error");
      return;
    }

    setPreviousFetchUrl(searchValue);
    const convertedSearchValue =
      searchValue.split("/")[3] + "/" + searchValue.split("/")[4] + "/issues";
    const urls = [convertedSearchValue, convertedSearchValue + "?state=closed"];
    setSearchUrl(convertedSearchValue);
    fetchIssues(urls);
  };

  const onReceivedData = (data: IssueType[]) => {
    const parts = searchValue.split("/");
    const convertedData = data.map((item: IssueType) => {
      return {
        id: uuid(),
        number: item.number,
        assignee: item.assignee,
        author: item.user.login,
        comments: item.comments,
        title: item.title,
        state: item.state,
        created_at: item.created_at,
      };
    });
    setIssuesData(convertedData);
    if (data.length > 0) {
      setGlobalData({
        profileName: parts[3],
        repositoryName: parts[4],
        profileUrl: parts.slice(0, 4).join("/"),
        repositoryUrl: parts.slice(0, 5).join("/"),
      });
      setActiveSearch(true);
    } else {
      showToast("No issues found. Try another one", "error");
    }
  };

  return (
    <Box as="header" p={4}>
      <Box
        w="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Input
          width="100%"
          placeholder="Basic usage"
          size="sm"
          value={searchValue}
          onChange={(e) => handleChange(e.target.value)}
        />
        <Button ml="10px" variant="outline" size="sm" onClick={onFetch}>
          Load Issues
        </Button>
      </Box>
      {isActiveSearch && (
        <Breadcrumb mt={4} separator=">">
          <BreadcrumbItem>
            <BreadcrumbLink
              color="blue.400"
              fontWeight="semi-bold"
              fontSize="larger"
              target="_blank"
              href={globalData.profileUrl}
            >
              {convertFirstLetterToUpperCase(globalData.profileName)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              color="blue.400"
              fontWeight="semi-bold"
              fontSize="larger"
              target="_blank"
              href={globalData.repositoryUrl}
            >
              {convertFirstLetterToUpperCase(globalData.repositoryName)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      )}
    </Box>
  );
};
