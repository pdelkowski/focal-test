import React from "react";
import Layout from "components/Layout";
import { useAuth } from "contexts/Auth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "components/Button";
import Label from "components/Label";
import SectionTitle from "components/SectionTitle";
import { useActivities } from "contexts/Activities";

const StyledSectionTitle = styled(SectionTitle)`
  margin-top: 65px;
`;

const HomeView: React.FC = () => {
  const auth = useAuth();
  const history = useHistory();
  const activitiesState = useActivities();

  const onLogout = async () => {
    auth?.logout();
    history.push("/login");
  }

  return (
    <Layout>
      <StyledSectionTitle>
        Hello {auth?.user?.name} on your dashboard
      </StyledSectionTitle>
      { activitiesState.data.map((activity, i) => {     
          return (<Label>{activity.id}/ {activity.name} at {activity.created_at}<br /></Label>) 
        })}
      <br />
      <Button variant="primary" onClick={() => { onLogout() }}>Logout</Button>
    </Layout>
  );
};

export default HomeView;
