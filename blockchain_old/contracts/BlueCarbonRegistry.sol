// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BlueCarbonRegistry {

    struct Project {
        uint256 projectId;
        string projectName;
        string location;
        uint256 carbonCredits;
        bool verified;
    }

    mapping(uint256 => Project) public projects;

    event ProjectRegistered(
        uint256 projectId,
        string projectName,
        string location
    );

    event ProjectVerified(
        uint256 projectId,
        uint256 carbonCredits
    );

    function registerProject(
        uint256 _projectId,
        string memory _projectName,
        string memory _location
    ) public {

        projects[_projectId] = Project(
            _projectId,
            _projectName,
            _location,
            0,
            false
        );

        emit ProjectRegistered(
            _projectId,
            _projectName,
            _location
        );
    }

    function verifyProject(
        uint256 _projectId,
        uint256 _carbonCredits
    ) public {

        projects[_projectId].carbonCredits = _carbonCredits;
        projects[_projectId].verified = true;

        emit ProjectVerified(
            _projectId,
            _carbonCredits
        );
    }

    function getProject(
        uint256 _projectId
    )
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            uint256,
            bool
        )
    {
        Project memory project = projects[_projectId];

        return (
            project.projectId,
            project.projectName,
            project.location,
            project.carbonCredits,
            project.verified
        );
    }
}