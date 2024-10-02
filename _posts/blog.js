import { Box, Flex, Text } from "rebass";

import Fade from "react-reveal/Fade";
import Link from "gatsby-link";
import React from "react";
import { Tag } from "../components/Tag";
import { graphql } from "gatsby";
import styled from "styled-components";
import { withTheme } from "styled-components";

const StyledLink = styled(Link)`
  color: #000;
  &:hover {
    color: #7c3319;
  }
`;

const DateText = styled(Text)`
  color: #bbb;
`;

const Blog = ({ data, theme }) => (
  <Box width={theme.defaultWidths}>
    <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
    {data.allMarkdownRemark.edges.map(({ node }, i) => (
      <Fade bottom delay={i * 100} key={node.id}>
        <StyledLink to={node.fields.slug}>
          {/* TODO: use rebass heading */}
          <h3>
            {node.frontmatter.title}{" "}
            <DateText as="span">— {node.frontmatter.date}</DateText>
          </h3>
          <Box>
            <Text>{node.excerpt}</Text>
            <Flex justifyContent="flex-start" mt={2}>
              {node.frontmatter.tags.map(tag => (
                <Tag key={node.id + tag}> {tag.toUpperCase()}</Tag>
              ))}
            </Flex>
          </Box>
        </StyledLink>
      </Fade>
    ))}
  </Box>
);

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
export default withTheme(Blog);
