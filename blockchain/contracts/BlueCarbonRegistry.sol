// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BlueCarbonRegistry {

    struct Project {
        uint256 id;
        string name;
        string location;
    }

    mapping(uint256 => Project) public projects;

    function registerProject(
        uint256 _id,
        string memory _name,
        string memory _location
    ) public {
        projects[_id] = Project(
            _id,
            _name,
            _location
        );
    }

    function getProject(uint256 _id)
        public
        view
        returns (
            uint256,
            string memory,
            string memory
        )
    {
        Project memory project = projects[_id];

        return (
            project.id,
            project.name,
            project.location
        );
    }
}